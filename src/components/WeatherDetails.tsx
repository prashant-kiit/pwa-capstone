import React from 'react';
import { WeatherDetails as WeatherDetailsType } from '../types/weather';
import { 
  Droplets, 
  Wind, 
  Gauge, 
  Thermometer, 
  Sun, 
  Eye, 
  Compass,
  CloudRain
} from 'lucide-react';

interface WeatherDetailsProps {
  details: WeatherDetailsType;
  unit: 'metric' | 'imperial';
}

const WeatherDetailsCard: React.FC<{ 
  icon: React.ReactNode, 
  title: string, 
  value: string,
  color?: string
}> = ({ icon, title, value, color = "text-blue-300" }) => (
  <div className="flex items-center p-4 bg-white/10 backdrop-blur-md rounded-lg">
    <div className={`p-3 rounded-full ${color} bg-white/10 mr-4`}>
      {icon}
    </div>
    <div>
      <p className="text-sm opacity-80">{title}</p>
      <p className="text-lg font-medium">{value}</p>
    </div>
  </div>
);

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ details, unit }) => {
  const speedUnit = unit === 'metric' ? 'm/s' : 'mph';
  
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 text-white shadow-lg h-full">
      <h3 className="text-xl font-semibold mb-4">Weather Details</h3>
      <div className="grid grid-cols-1 gap-4">
        <WeatherDetailsCard
          icon={<Thermometer className="w-5 h-5" />}
          title="Feels Like"
          value={`${Math.round(details.feelsLike)}${unit === 'metric' ? '°C' : '°F'}`}
          color="text-red-300"
        />
        <WeatherDetailsCard
          icon={<Droplets className="w-5 h-5" />}
          title="Humidity"
          value={`${details.humidity}%`}
          color="text-blue-300"
        />
        <WeatherDetailsCard
          icon={<Wind className="w-5 h-5" />}
          title="Wind Speed"
          value={`${details.windSpeed} ${speedUnit}`}
          color="text-teal-300"
        />
        <WeatherDetailsCard
          icon={<Compass className="w-5 h-5" />}
          title="Wind Direction"
          value={details.windDirection}
          color="text-teal-300"
        />
        <WeatherDetailsCard
          icon={<Gauge className="w-5 h-5" />}
          title="Pressure"
          value={`${details.pressure} hPa`}
          color="text-purple-300"
        />
        <WeatherDetailsCard
          icon={<Sun className="w-5 h-5" />}
          title="UV Index"
          value={`${details.uvIndex}`}
          color="text-yellow-300"
        />
        <WeatherDetailsCard
          icon={<Eye className="w-5 h-5" />}
          title="Visibility"
          value={`${details.visibility} km`}
          color="text-gray-300"
        />
        <WeatherDetailsCard
          icon={<CloudRain className="w-5 h-5" />}
          title="Precipitation"
          value={`${details.precipitation} mm`}
          color="text-blue-300"
        />
      </div>
    </div>
  );
};

export default WeatherDetails;