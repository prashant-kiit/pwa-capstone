import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  onSearch: (location: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLocationLoading, setIsLocationLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            // In a real app, we would convert coordinates to city name using reverse geocoding API
            // For this example, we'll pass the coordinates as a string
            onSearch(`${latitude},${longitude}`);
          } catch (error) {
            console.error('Error getting location:', error);
          } finally {
            setIsLocationLoading(false);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLocationLoading(false);
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <div className="flex items-center">
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a city..."
            className="w-full px-4 py-3 pl-10 pr-12 bg-white/20 backdrop-blur-md rounded-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
        </div>
        <button
          type="button"
          onClick={handleGetCurrentLocation}
          className="ml-2 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
          disabled={isLocationLoading}
        >
          <MapPin className={`w-5 h-5 ${isLocationLoading ? 'animate-pulse' : ''}`} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;