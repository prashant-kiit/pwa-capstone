import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
  weatherCondition?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children,
  weatherCondition
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for user's preferred color scheme
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDarkMode);
    
    // Also check time of day - default to dark mode in evening hours
    const currentHour = new Date().getHours();
    if (currentHour < 6 || currentHour >= 18) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Adjust theme based on weather condition
    if (weatherCondition) {
      const lowerCondition = weatherCondition.toLowerCase();
      
      // Dark conditions that should trigger dark mode
      if (
        lowerCondition.includes('rain') || 
        lowerCondition.includes('thunder') || 
        lowerCondition.includes('storm') ||
        lowerCondition.includes('snow') ||
        lowerCondition.includes('fog') ||
        lowerCondition.includes('overcast')
      ) {
        setIsDarkMode(true);
      }
      
      // Light conditions that should trigger light mode during the day
      const currentHour = new Date().getHours();
      if (
        (lowerCondition.includes('clear') || lowerCondition.includes('sunny')) &&
        currentHour >= 6 && currentHour < 18
      ) {
        setIsDarkMode(false);
      }
    }
  }, [weatherCondition]);

  useEffect(() => {
    // Apply dark mode class to HTML element
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};