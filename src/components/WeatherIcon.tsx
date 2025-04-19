import React from 'react';
import { 
  Sun, 
  Moon, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  CloudFog, 
  CloudDrizzle,
  CloudSun,
  CloudMoon
} from 'lucide-react';

interface WeatherIconProps {
  condition: string;
  isDay: boolean;
  size?: 'small' | 'medium' | 'large';
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, isDay, size = 'medium' }) => {
  const sizeMap = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  const getIconClass = () => {
    const baseClass = `${sizeMap[size]} text-white`;
    
    // Add animation classes based on condition
    if (condition.includes('rain')) {
      return `${baseClass} animate-bounce-slow`;
    } else if (condition.includes('snow')) {
      return `${baseClass} animate-pulse`;
    } else if (condition.includes('thunder')) {
      return `${baseClass} animate-flash`;
    } else if (isDay && (condition.includes('clear') || condition.includes('sunny'))) {
      return `${baseClass} animate-spin-slow`;
    }
    
    return baseClass;
  };

  const getIcon = () => {
    const lowerCondition = condition.toLowerCase();
    
    // Clear/Sunny conditions
    if (lowerCondition.includes('clear') || lowerCondition.includes('sunny')) {
      return isDay ? <Sun className={getIconClass()} /> : <Moon className={getIconClass()} />;
    }
    
    // Partly cloudy
    if (lowerCondition.includes('partly cloudy')) {
      return isDay ? <CloudSun className={getIconClass()} /> : <CloudMoon className={getIconClass()} />;
    }
    
    // Rain conditions
    if (lowerCondition.includes('rain') || lowerCondition.includes('shower')) {
      return <CloudRain className={getIconClass()} />;
    }
    
    // Drizzle
    if (lowerCondition.includes('drizzle')) {
      return <CloudDrizzle className={getIconClass()} />;
    }
    
    // Snow conditions
    if (lowerCondition.includes('snow') || lowerCondition.includes('sleet') || lowerCondition.includes('blizzard')) {
      return <CloudSnow className={getIconClass()} />;
    }
    
    // Thunder conditions
    if (lowerCondition.includes('thunder') || lowerCondition.includes('storm')) {
      return <CloudLightning className={getIconClass()} />;
    }
    
    // Fog/Mist conditions
    if (lowerCondition.includes('fog') || lowerCondition.includes('mist')) {
      return <CloudFog className={getIconClass()} />;
    }
    
    // Default to cloudy
    return <Cloud className={getIconClass()} />;
  };

  return getIcon();
};

export default WeatherIcon;