import React from 'react';
import { CurrentWeather as CurrentWeatherType, Location } from '../types/weather';
import { formatDate, getUnitSymbol } from '../utils/helpers';
import WeatherIcon from './WeatherIcon';
import { MapPin } from 'lucide-react';

interface CurrentWeatherProps {
  currentWeather: CurrentWeatherType;
  location: Location;
  unit: 'metric' | 'imperial';
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ 
  currentWeather, 
  location,
  unit
}) => {
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 text-white shadow-lg animate-fadeIn overflow-hidden relative h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <div className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            <h2 className="text-2xl font-bold">{location.city}, {location.country}</h2>
          </div>
          <p className="text-lg opacity-90 mt-1">{formatDate(new Date())}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <span className="text-xs uppercase tracking-wider px-3 py-1 bg-white/20 rounded-full">
            {currentWeather.condition}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-24 h-24">
            <WeatherIcon condition={currentWeather.condition} isDay={currentWeather.isDay} size="large" />
          </div>
          <div className="ml-4">
            <div className="flex items-start">
              <span className="text-6xl font-light">{Math.round(currentWeather.temperature)}</span>
              <span className="text-3xl mt-1">{getUnitSymbol(unit)}</span>
            </div>
            <p className="text-lg opacity-90">Feels like {Math.round(currentWeather.feelsLike)}{getUnitSymbol(unit)}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm md:text-base">
          <div className="flex flex-col">
            <span className="opacity-80">High</span>
            <span className="font-medium">{Math.round(currentWeather.maxTemperature)}{getUnitSymbol(unit)}</span>
          </div>
          <div className="flex flex-col">
            <span className="opacity-80">Low</span>
            <span className="font-medium">{Math.round(currentWeather.minTemperature)}{getUnitSymbol(unit)}</span>
          </div>
          <div className="flex flex-col">
            <span className="opacity-80">Sunrise</span>
            <span className="font-medium">{currentWeather.sunrise}</span>
          </div>
          <div className="flex flex-col">
            <span className="opacity-80">Sunset</span>
            <span className="font-medium">{currentWeather.sunset}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;