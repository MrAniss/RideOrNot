import { useState, useEffect, useRef } from 'react';

/**
 * Search for cities using Open-Meteo Geocoding API
 */
async function searchCities(query) {
  if (query.length < 2) return [];

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=fr&format=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) return [];

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('City search error:', error);
    return [];
  }
}

export default function LocationSearch({ onLocationSelect, onUseGeolocation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchTimeout = useRef(null);

  useEffect(() => {
    // Debounced search
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (query.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setLoading(true);
    searchTimeout.current = setTimeout(async () => {
      const cities = await searchCities(query);
      setResults(cities);
      setShowResults(true);
      setLoading(false);
    }, 300);

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [query]);

  const handleCitySelect = (city) => {
    setQuery(`${city.name}, ${city.country}`);
    setShowResults(false);

    // Get last chosen location from localStorage
    const lastLocation = {
      latitude: city.latitude,
      longitude: city.longitude,
      city: city.name,
      country: city.country,
      admin1: city.admin1 || ''
    };

    localStorage.setItem('lastLocation', JSON.stringify(lastLocation));

    onLocationSelect(lastLocation);
  };

  const handleGeolocationClick = () => {
    setQuery('');
    setResults([]);
    setShowResults(false);
    onUseGeolocation();
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une ville..."
            className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
          />

          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
            </div>
          )}

          {/* Autocomplete Results */}
          {showResults && results.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl z-10 max-h-60 overflow-y-auto">
              {results.map((city, index) => (
                <button
                  key={`${city.id}-${index}`}
                  onClick={() => handleCitySelect(city)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <p className="font-medium text-gray-900">{city.name}</p>
                  <p className="text-xs text-gray-500">
                    {[city.admin1, city.country].filter(Boolean).join(', ')}
                  </p>
                </button>
              ))}
            </div>
          )}

          {showResults && results.length === 0 && query.length >= 2 && !loading && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl z-10 px-4 py-3">
              <p className="text-sm text-gray-500">Aucune ville trouvée</p>
            </div>
          )}
        </div>

        <button
          onClick={handleGeolocationClick}
          className="bg-white/20 hover:bg-white/30 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors flex items-center gap-1 whitespace-nowrap"
        >
          📍 Me localiser
        </button>
      </div>

      <p className="text-white/70 text-xs">
        Recherchez une ville ou utilisez la géolocalisation
      </p>
    </div>
  );
}
