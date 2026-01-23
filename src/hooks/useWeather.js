import { useState, useCallback } from 'react';
import { fetchWeather, extractWeatherWindow } from '../utils/weatherApi';
import { analyzeConditions } from '../utils/decisionEngine';

/**
 * Custom hook for weather data and analysis
 * @returns {Object} analysis, loading, error, analyzeWeather
 */
export function useWeather() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeWeather = useCallback(async (latitude, longitude, durationHours) => {
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      // Fetch weather data
      const weatherData = await fetchWeather(latitude, longitude);

      // Extract window for ride duration
      const weatherWindow = extractWeatherWindow(weatherData, durationHours);

      // Analyze conditions
      const result = analyzeConditions(weatherWindow);

      setAnalysis({
        ...result,
        duration: durationHours,
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
    loading,
    error,
    analyzeWeather
  };
}
