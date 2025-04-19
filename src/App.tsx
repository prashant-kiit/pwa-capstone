import React, { useState, useEffect } from 'react';
import WeatherDashboard from './components/WeatherDashboard';
import SearchBar from './components/SearchBar';
import { fetchWeatherData } from './api/weatherAPI';
import { WeatherData } from './types/weather';
import { CloudSun, Loader } from 'lucide-react';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<string>('London');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

  useEffect(() => {
    const getInitialWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchWeatherData(location, unit);
        setWeatherData(data);
      } catch (err) {
        setError('Failed to fetch weather data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getInitialWeather();
  }, [location, unit]);

  const handleSearch = async (searchLocation: string) => {
    if (!searchLocation.trim()) return;
    
    setLocation(searchLocation);
  };

  const toggleUnit = () => {
    setUnit(prev => prev === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <ThemeProvider weatherCondition={weatherData?.currentWeather.condition}>
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 dark:from-gray-800 dark:to-gray-900 transition-colors duration-1000">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <header className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <div className="flex items-center">
              <CloudSun className="w-10 h-10 text-white mr-2" />
              <h1 className="text-2xl font-bold text-white">Weather App</h1>
            </div>
            <SearchBar onSearch={handleSearch} />
            <button
              onClick={toggleUnit}
              className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-medium hover:bg-white/30 transition-colors"
            >
              {unit === 'metric' ? '°C' : '°F'}
            </button>
          </header>

          {loading ? (
            <div className="flex flex-col items-center justify-center h-96">
              <Loader className="w-16 h-16 text-white animate-spin" />
              <p className="mt-4 text-white text-xl">Loading weather data...</p>
            </div>
          ) : error ? (
            <div className="bg-red-500/20 backdrop-blur-md rounded-xl p-8 text-center">
              <p className="text-white text-xl">{error}</p>
              <button
                onClick={() => handleSearch(location)}
                className="mt-4 px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-medium hover:bg-white/30 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : weatherData ? (
            <WeatherDashboard weatherData={weatherData} unit={unit} />
          ) : null}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;