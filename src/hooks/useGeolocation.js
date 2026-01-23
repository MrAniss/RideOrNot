import { useState, useEffect } from 'react';
import { reverseGeocode } from '../utils/geocoding';

/**
 * Custom hook for geolocation with reverse geocoding
 * @returns {Object} location, error, loading, requestLocation
 */
export function useGeolocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const requestLocation = async () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('La géolocalisation n\'est pas supportée par votre navigateur');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        };

        // Set coordinates immediately
        setLocation({ ...coords, city: null, country: null });

        // Fetch city name in background
        try {
          const geocodeData = await reverseGeocode(coords.latitude, coords.longitude);

          setLocation({
            ...coords,
            city: geocodeData.city,
            country: geocodeData.country
          });
        } catch (err) {
          // Keep coordinates even if geocoding fails
          console.warn('Geocoding failed, keeping coordinates only');
        }

        setLoading(false);
      },
      (err) => {
        let errorMessage = 'Erreur de géolocalisation';

        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = 'Permission de géolocalisation refusée';
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = 'Position non disponible';
            break;
          case err.TIMEOUT:
            errorMessage = 'Délai de géolocalisation dépassé';
            break;
          default:
            errorMessage = 'Erreur de géolocalisation inconnue';
        }

        setError(errorMessage);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes cache
      }
    );
  };

  // Auto-request on mount
  useEffect(() => {
    requestLocation();
  }, []);

  return {
    location,
    error,
    loading,
    requestLocation
  };
}
