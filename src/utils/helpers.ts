import { CurrentWeather, FormattedForecast, Location, OpenWeatherForecast, OpenWeatherResponse } from "../types/weather";

export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
};

export const formatDay = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

export const getUnitSymbol = (unit: string): string => {
  return unit === 'metric' ? '°C' : '°F';
};

export const getWindSpeedUnit = (unit: string): string => {
  return unit === 'metric' ? 'm/s' : 'mph';
};

export const getWeatherBackgroundClass = (condition: string, isDay: boolean): string => {
  const lowerCondition = condition.toLowerCase();
  
  if (isDay) {
    if (lowerCondition.includes('clear') || lowerCondition.includes('sunny')) {
      return 'from-blue-400 to-blue-600';
    } else if (lowerCondition.includes('cloud') || lowerCondition.includes('overcast')) {
      return 'from-gray-300 to-blue-400';
    } else if (lowerCondition.includes('rain') || lowerCondition.includes('shower') || lowerCondition.includes('drizzle')) {
      return 'from-gray-400 to-gray-600';
    } else if (lowerCondition.includes('snow') || lowerCondition.includes('sleet')) {
      return 'from-blue-100 to-blue-300';
    } else if (lowerCondition.includes('thunder') || lowerCondition.includes('storm')) {
      return 'from-gray-600 to-gray-800';
    } else if (lowerCondition.includes('fog') || lowerCondition.includes('mist')) {
      return 'from-gray-300 to-gray-500';
    }
  } else {
    // Night variants
    if (lowerCondition.includes('clear')) {
      return 'from-blue-900 to-gray-900';
    } else if (lowerCondition.includes('cloud') || lowerCondition.includes('overcast')) {
      return 'from-gray-700 to-gray-900';
    } else if (lowerCondition.includes('rain') || lowerCondition.includes('shower') || lowerCondition.includes('drizzle')) {
      return 'from-gray-800 to-gray-900';
    } else if (lowerCondition.includes('snow') || lowerCondition.includes('sleet')) {
      return 'from-blue-900 to-gray-800';
    } else if (lowerCondition.includes('thunder') || lowerCondition.includes('storm')) {
      return 'from-gray-900 to-black';
    } else if (lowerCondition.includes('fog') || lowerCondition.includes('mist')) {
      return 'from-gray-700 to-gray-800';
    }
  }
  
  // Default
  return isDay ? 'from-blue-400 to-blue-600' : 'from-blue-900 to-gray-900';
};


export function formatForecastData(data: OpenWeatherForecast[]): { forecast: FormattedForecast[] } {
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

export function formatWeatherData(raw: OpenWeatherResponse): { location: Location, currentWeather: CurrentWeather } {
  const degToCompass = (deg: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(deg / 45) % 8];
  };

  const toTime = (timestamp: number, timezoneOffset: number) => {
    const date = new Date((timestamp + timezoneOffset) * 1000);
    return date.toUTCString().slice(17, 22); // returns "HH:MM"
  };

  return {
    location: {
      city: raw.name,
      country: raw.sys.country,
      latitude: raw.coord.lat,
      longitude: raw.coord.lon,
    },
    currentWeather: {
      temperature: Math.round(raw.main.temp),
      feelsLike: Math.round(raw.main.feels_like),
      minTemperature: Math.round(raw.main.temp_min),
      maxTemperature: Math.round(raw.main.temp_max),
      condition: raw.weather[0].description,
      icon: raw.weather[0].icon,
      sunrise: toTime(raw.sys.sunrise, raw.timezone),
      sunset: toTime(raw.sys.sunset, raw.timezone),
      isDay: raw.dt > raw.sys.sunrise && raw.dt < raw.sys.sunset,
      details: {
        humidity: raw.main.humidity,
        pressure: raw.main.pressure,
        windSpeed: raw.wind.speed,
        windDirection: degToCompass(raw.wind.deg),
        uvIndex: 4, // Placeholder – not in raw data
        visibility: raw.visibility / 1000, // in km
        feelsLike: Math.round(raw.main.feels_like),
        precipitation: 0, // Placeholder – not in raw data
      }
    }
  };
}

