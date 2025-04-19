export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
};

export const formatDay = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

export const getUnitSymbol = (unit: string): string => {
  return unit === 'metric' ? '°C' : '°F';
};

export const getWindSpeedUnit = (unit: string): string => {
  return unit === 'metric' ? 'm/s' : 'mph';
};

export const getWeatherBackgroundClass = (condition: string, isDay: boolean): string => {
  const lowerCondition = condition.toLowerCase();
  
  if (isDay) {
    if (lowerCondition.includes('clear') || lowerCondition.includes('sunny')) {
      return 'from-blue-400 to-blue-600';
    } else if (lowerCondition.includes('cloud') || lowerCondition.includes('overcast')) {
      return 'from-gray-300 to-blue-400';
    } else if (lowerCondition.includes('rain') || lowerCondition.includes('shower') || lowerCondition.includes('drizzle')) {
      return 'from-gray-400 to-gray-600';
    } else if (lowerCondition.includes('snow') || lowerCondition.includes('sleet')) {
      return 'from-blue-100 to-blue-300';
    } else if (lowerCondition.includes('thunder') || lowerCondition.includes('storm')) {
      return 'from-gray-600 to-gray-800';
    } else if (lowerCondition.includes('fog') || lowerCondition.includes('mist')) {
      return 'from-gray-300 to-gray-500';
    }
  } else {
    // Night variants
    if (lowerCondition.includes('clear')) {
      return 'from-blue-900 to-gray-900';
    } else if (lowerCondition.includes('cloud') || lowerCondition.includes('overcast')) {
      return 'from-gray-700 to-gray-900';
    } else if (lowerCondition.includes('rain') || lowerCondition.includes('shower') || lowerCondition.includes('drizzle')) {
      return 'from-gray-800 to-gray-900';
    } else if (lowerCondition.includes('snow') || lowerCondition.includes('sleet')) {
      return 'from-blue-900 to-gray-800';
    } else if (lowerCondition.includes('thunder') || lowerCondition.includes('storm')) {
      return 'from-gray-900 to-black';
    } else if (lowerCondition.includes('fog') || lowerCondition.includes('mist')) {
      return 'from-gray-700 to-gray-800';
    }
  }
  
  // Default
  return isDay ? 'from-blue-400 to-blue-600' : 'from-blue-900 to-gray-900';
};