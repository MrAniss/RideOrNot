import { useState, useEffect } from 'react';

/**
 * Custom hook for geolocation
 * @returns {Object} location, error, loading, requestLocation
 */
export function useGeolocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const requestLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('La géolocalisation n\'est pas supportée par votre navigateur');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
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
