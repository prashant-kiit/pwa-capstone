import axios from 'axios';
import { CurrentWeather, Forecast, Location } from '../types/weather';
import { formatForecastData, formatWeatherData } from '../utils/helpers';

export const fetchWeatherData = async (
  location: string,
  unit: 'metric' | 'imperial' = 'metric'
): Promise<{ location: Location, currentWeather: CurrentWeather, forecast: Forecast[] }> => {
  try {

    const currentWeatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=3d65267a515fe0ab3739cdc2d8e34ea2`
    );

    const forecastResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${unit}&appid=3d65267a515fe0ab3739cdc2d8e34ea2`
    );

    const customizedData = { ...formatWeatherData(currentWeatherResponse?.data), ...formatForecastData(forecastResponse?.data?.list) };

    // Update location
    customizedData.location.city = location.split(',')[0];

    // Adjust temperatures for imperial units if needed
    if (unit === 'imperial') {
      // Convert temperatures from Celsius to Fahrenheit
      const celsiusToFahrenheit = (celsius: number) => (celsius * 9 / 5) + 32;

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

    console.log("customizedData", customizedData);
    return customizedData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
};