export interface Location {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface WeatherDetails {
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: string;
  uvIndex: number;
  visibility: number;
  feelsLike: number;
  precipitation: number;
}

export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  minTemperature: number;
  maxTemperature: number;
  condition: string;
  icon: string;
  sunrise: string;
  sunset: string;
  isDay: boolean;
  details: WeatherDetails;
}

export interface Forecast {
  date: string;
  maxTemperature: number;
  minTemperature: number;
  condition: string;
  icon: string;
  precipitation: number;
  humidity: number;
  windSpeed: number;
}

export interface WeatherData {
  location: Location;
  currentWeather: CurrentWeather;
  forecast: Forecast[];
}

export interface OpenWeatherForecast {
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

export interface FormattedForecast {
  date: string;
  maxTemperature: number;
  minTemperature: number;
  condition: string;
  icon: string;
  precipitation: number;
  humidity: number;
  windSpeed: number;
}

export interface OpenWeatherResponse {
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  coord: {
    lat: number;
    lon: number;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  dt: number;
  timezone: number;
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
}

export interface WeatherData {
  location: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  currentWeather: {
    temperature: number;
    feelsLike: number;
    minTemperature: number;
    maxTemperature: number;
    condition: string;
    icon: string;
    sunrise: string;
    sunset: string;
    isDay: boolean;
    details: {
      humidity: number;
      pressure: number;
      windSpeed: number;
      windDirection: string;
      uvIndex: number;
      visibility: number;
      feelsLike: number;
      precipitation: number;
    }
  }
}