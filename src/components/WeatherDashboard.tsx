import React from 'react';
import CurrentWeather from './CurrentWeather';
import ForecastList from './ForecastList';
import WeatherDetails from './WeatherDetails';
import { WeatherData } from '../types/weather';

interface WeatherDashboardProps {
  weatherData: WeatherData;
  unit: 'metric' | 'imperial';
}

const WeatherDashboard: React.FC<WeatherDashboardProps> = ({ weatherData, unit }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <CurrentWeather 
          currentWeather={weatherData.currentWeather} 
          location={weatherData.location}
          unit={unit}
        />
      </div>
      <div className="lg:row-span-2">
        <WeatherDetails 
          details={weatherData.currentWeather.details} 
          unit={unit}
        />
      </div>
      <div className="lg:col-span-2">
        <ForecastList 
          forecast={weatherData.forecast}
          unit={unit} 
        />
      </div>
    </div>
  );
};

export default WeatherDashboard;