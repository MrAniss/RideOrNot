import { useState, useCallback } from 'react';
import { fetchWeather, extractWeatherWindow } from '../utils/weatherApi';
import { analyzeConditions } from '../utils/decisionEngine';

/**
 * Custom hook for weather data and analysis
 * @returns {Object} analysis, loading, error, analyzeWeather, weatherWindow
 */
export function useWeather() {
  const [analysis, setAnalysis] = useState(null);
  const [weatherWindow, setWeatherWindow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeWeather = useCallback(async (latitude, longitude, durationHours, departureTime = new Date()) => {
    setLoading(true);
    setError(null);
    setAnalysis(null);
    setWeatherWindow(null);

    try {
      // Fetch weather data
      const weatherData = await fetchWeather(latitude, longitude);

      // Extract window for ride duration
      const window = extractWeatherWindow(weatherData, durationHours, departureTime);

      // Analyze conditions
      const result = analyzeConditions(window);

      setWeatherWindow(window);
      setAnalysis({
        ...result,
        duration: durationHours,
        departureTime,
        location: { latitude, longitude }
      });
    } catch (err) {
      setError(err.message || 'Erreur lors de la récupération des données météo');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    analysis,
    weatherWindow,
    loading,
    error,
    analyzeWeather
  };
}
