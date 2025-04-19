import axios from 'axios';
import { WeatherData } from '../types/weather';
import { mockWeatherData } from './mockData';

// In a real app, this would be stored in environment variables
// For this demo, we're using a mock implementation instead of a real API key
// const API_KEY = 'your_api_key_here';
// const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (
  location: string, 
  unit: 'metric' | 'imperial' = 'metric'
): Promise<WeatherData> => {
  try {
    // In a real implementation, we would make API calls to a weather service
    // For example:
    /*
    const currentWeatherResponse = await axios.get(
      `${BASE_URL}/weather?q=${location}&units=${unit}&appid=${API_KEY}`
    );
    
    const forecastResponse = await axios.get(
      `${BASE_URL}/forecast?q=${location}&units=${unit}&appid=${API_KEY}`
    );
    
    // Then transform the responses to match our WeatherData type
    */
    
    // For this demo, we'll return mock data with a slight delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Customize the mock data based on the location and unit
    const customizedData = { ...mockWeatherData };
    
    // Update location
    customizedData.location.city = location.split(',')[0];
    
    // Adjust temperatures for imperial units if needed
    if (unit === 'imperial') {
      // Convert temperatures from Celsius to Fahrenheit
      const celsiusToFahrenheit = (celsius: number) => (celsius * 9/5) + 32;
      
      customizedData.currentWeather.temperature = celsiusToFahrenheit(customizedData.currentWeather.temperature);
      customizedData.currentWeather.feelsLike = celsiusToFahrenheit(customizedData.currentWeather.feelsLike);
      customizedData.currentWeather.minTemperature = celsiusToFahrenheit(customizedData.currentWeather.minTemperature);
      customizedData.currentWeather.maxTemperature = celsiusToFahrenheit(customizedData.currentWeather.maxTemperature);
      customizedData.currentWeather.details.feelsLike = celsiusToFahrenheit(customizedData.currentWeather.details.feelsLike);
      
      // Convert wind speed from m/s to mph
      customizedData.currentWeather.details.windSpeed = customizedData.currentWeather.details.windSpeed * 2.237;
      
      // Update forecast
      customizedData.forecast = customizedData.forecast.map(day => ({
        ...day,
        maxTemperature: celsiusToFahrenheit(day.maxTemperature),
        minTemperature: celsiusToFahrenheit(day.minTemperature),
        windSpeed: day.windSpeed * 2.237
      }));
    }
    
    // Randomly change weather condition based on location string
    // This makes the app more interesting when searching different locations
    const conditions = [
      'Clear', 'Partly cloudy', 'Cloudy', 'Overcast', 
      'Light rain', 'Moderate rain', 'Heavy rain',
      'Thunderstorm', 'Fog', 'Light snow', 'Snow'
    ];
    
    // Use the length of the location string to seed a pseudo-random condition
    const conditionIndex = location.length % conditions.length;
    const newCondition = conditions[conditionIndex];
    
    customizedData.currentWeather.condition = newCondition;
    
    // Update the first forecast day to match current condition
    if (customizedData.forecast.length > 0) {
      customizedData.forecast[0].condition = newCondition;
    }
    
    return customizedData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
};