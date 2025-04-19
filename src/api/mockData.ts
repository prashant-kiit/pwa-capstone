import { WeatherData } from '../types/weather';

export const mockWeatherData: WeatherData = {
  location: {
    city: 'London',
    country: 'UK',
    latitude: 51.5074,
    longitude: 0.1278
  },
  currentWeather: {
    temperature: 18,
    feelsLike: 17,
    minTemperature: 15,
    maxTemperature: 20,
    condition: 'Partly cloudy',
    icon: '02d',
    sunrise: '06:45',
    sunset: '19:30',
    isDay: true,
    details: {
      humidity: 65,
      pressure: 1012,
      windSpeed: 5.2,
      windDirection: 'NW',
      uvIndex: 4,
      visibility: 10,
      feelsLike: 17,
      precipitation: 0.2
    }
  },
  forecast: [
    {
      date: '2025-05-01',
      maxTemperature: 20,
      minTemperature: 14,
      condition: 'Partly cloudy',
      icon: '02d',
      precipitation: 10,
      humidity: 65,
      windSpeed: 5.2
    },
    {
      date: '2025-05-02',
      maxTemperature: 22,
      minTemperature: 16,
      condition: 'Sunny',
      icon: '01d',
      precipitation: 0,
      humidity: 55,
      windSpeed: 4.8
    },
    {
      date: '2025-05-03',
      maxTemperature: 19,
      minTemperature: 15,
      condition: 'Light rain',
      icon: '10d',
      precipitation: 40,
      humidity: 75,
      windSpeed: 6.1
    },
    {
      date: '2025-05-04',
      maxTemperature: 17,
      minTemperature: 12,
      condition: 'Moderate rain',
      icon: '10d',
      precipitation: 60,
      humidity: 85,
      windSpeed: 7.2
    },
    {
      date: '2025-05-05',
      maxTemperature: 18,
      minTemperature: 13,
      condition: 'Cloudy',
      icon: '03d',
      precipitation: 20,
      humidity: 70,
      windSpeed: 5.5
    }
  ]
};

// Additional mock data sets could be defined here for different locations or scenarios