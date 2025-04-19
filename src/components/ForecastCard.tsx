import React from 'react';
import { Forecast } from '../types/weather';
import { getUnitSymbol, formatDay } from '../utils/helpers';
import WeatherIcon from './WeatherIcon';

interface ForecastCardProps {
  forecast: Forecast;
  unit: 'metric' | 'imperial';
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, unit }) => {
  return (
    <div className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 transition-colors">
      <p className="text-sm font-medium mb-2">{formatDay(forecast.date)}</p>
      <div className="my-2 w-16 h-16">
        <WeatherIcon condition={forecast.condition} isDay={true} />
      </div>
      <div className="flex justify-between w-full mt-2">
        <span className="font-medium">{Math.round(forecast.maxTemperature)}{getUnitSymbol(unit)}</span>
        <span className="opacity-80">{Math.round(forecast.minTemperature)}{getUnitSymbol(unit)}</span>
      </div>
    </div>
  );
};

export default ForecastCard;