import React from 'react';
import { Forecast } from '../types/weather';
import ForecastCard from './ForecastCard';

interface ForecastListProps {
  forecast: Forecast[];
  unit: 'metric' | 'imperial';
}

const ForecastList: React.FC<ForecastListProps> = ({ forecast, unit }) => {
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 text-white shadow-lg">
      <h3 className="text-xl font-semibold mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <ForecastCard key={index} forecast={day} unit={unit} />
        ))}
      </div>
    </div>
  );
};

export default ForecastList;