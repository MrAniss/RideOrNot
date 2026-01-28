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

export default function LocationSearch({ onLocationSelect, onUseGeolocation, location, loading: geoLoading, error: geoError }) {
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
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une ville..."
            className="w-full bg-bg-secondary border border-text-primary/20 rounded-lg px-3 py-2 text-text-primary placeholder-text-primary/50 text-sm font-body focus:outline-none focus:ring-2 focus:ring-accent"
          />

          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-text-primary border-t-transparent"></div>
            </div>
          )}

          {/* Autocomplete Results */}
          {showResults && results.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-bg-secondary border border-text-primary/20 rounded-lg shadow-xl z-10 max-h-60 overflow-y-auto">
              {results.map((city, index) => (
                <button
                  key={`${city.id}-${index}`}
                  onClick={() => handleCitySelect(city)}
                  className="w-full text-left px-4 py-3 hover:bg-accent/20 transition-colors border-b border-text-primary/10 last:border-b-0"
                >
                  <p className="font-medium text-text-primary font-body">{city.name}</p>
                  <p className="text-xs text-text-primary/70 font-body">
                    {[city.admin1, city.country].filter(Boolean).join(', ')}
                  </p>
                </button>
              ))}
            </div>
          )}

          {showResults && results.length === 0 && query.length >= 2 && !loading && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-bg-secondary border border-text-primary/20 rounded-lg shadow-xl z-10 px-4 py-3">
              <p className="text-sm text-text-primary/70 font-body">Aucune ville trouvée</p>
            </div>
          )}
        </div>

        <button
          onClick={handleGeolocationClick}
          disabled={geoLoading}
          className={`rounded-lg px-4 py-2 text-sm font-body font-medium transition-colors flex items-center gap-1 whitespace-nowrap border ${
            geoLoading
              ? 'bg-bg-primary/50 border-text-primary/20 text-text-primary/50 cursor-not-allowed'
              : 'bg-bg-secondary border-text-primary/20 hover:border-accent text-text-primary'
          }`}
        >
          {geoLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-text-primary border-t-transparent"></div>
              <span>Localisation...</span>
            </>
          ) : (
            <>📍 Me localiser</>
          )}
        </button>
      </div>

      {/* Display active location */}
      {location && (
        <div className="bg-bg-secondary border border-accent/30 rounded-lg p-3 text-text-primary text-sm flex items-center gap-2 animate-fade-in">
          <span className="text-lg">📍</span>
          <div className="flex-1">
            {location.city ? (
              <>
                <p className="font-medium font-body">{location.city}</p>
                {location.country && (
                  <p className="text-text-primary/70 text-xs font-body">{location.country}</p>
                )}
              </>
            ) : (
              <>
                <p className="font-medium font-body">Position détectée</p>
                <p className="text-text-primary/70 text-xs font-body">
                  {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Error display */}
      {geoError && (
        <div className="bg-verdict-nogo/20 rounded-lg p-3 text-text-primary text-sm border border-verdict-nogo">
          <p className="font-body">{geoError}</p>
        </div>
      )}

      {!location && !geoError && (
        <p className="text-text-primary/70 text-xs font-body">
          Recherchez une ville ou utilisez la géolocalisation
        </p>
      )}
    </div>
  );
}
