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