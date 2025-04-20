interface OpenWeatherForecast {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  pop: number;
  dt_txt: string;
  rain?: {
    "3h": number;
  };
}

interface FormattedForecast {
  date: string;
  maxTemperature: number;
  minTemperature: number;
  condition: string;
  icon: string;
  precipitation: number;
  humidity: number;
  windSpeed: number;
}

interface FormattedWeatherData {
  forecast: FormattedForecast[];
}

export function formatForecastData(data: OpenWeatherForecast[]): FormattedWeatherData {
  // Group forecasts by date
  const dailyForecasts = data.reduce((acc, forecast) => {
    const date = forecast.dt_txt.split(' ')[0]; // Get date part only
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(forecast);
    return acc;
  }, {} as Record<string, OpenWeatherForecast[]>);

  // Process each day's forecasts
  const formattedForecast = Object.entries(dailyForecasts).map(([date, forecasts]) => {
    // Find max and min temperatures for the day
    const maxTemp = Math.max(...forecasts.map(f => f.main.temp_max));
    const minTemp = Math.min(...forecasts.map(f => f.main.temp_min));
    
    // Get the forecast for mid-day (around 12:00 or 15:00) for representative conditions
    const midDayForecast = forecasts.find(f => 
      f.dt_txt.includes('12:00:00') || f.dt_txt.includes('15:00:00')
    ) || forecasts[0];

    // Calculate average humidity and wind speed
    const avgHumidity = Math.round(
      forecasts.reduce((sum, f) => sum + f.main.humidity, 0) / forecasts.length
    );
    const avgWindSpeed = Math.round(
      (forecasts.reduce((sum, f) => sum + f.wind.speed, 0) / forecasts.length) * 10
    ) / 10;

    // Calculate precipitation probability
    const maxPop = Math.max(...forecasts.map(f => f.pop));
    const precipitation = Math.round(maxPop * 100);

    return {
      date,
      maxTemperature: Math.round(maxTemp),
      minTemperature: Math.round(minTemp),
      condition: midDayForecast.weather[0].main,
      icon: midDayForecast.weather[0].icon,
      precipitation,
      humidity: avgHumidity,
      windSpeed: avgWindSpeed
    };
  });

  return {
    forecast: formattedForecast
  };
} 