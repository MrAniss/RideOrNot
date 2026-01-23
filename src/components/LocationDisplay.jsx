export default function LocationDisplay({ location, loading, error, onRetry }) {
  if (loading) {
    return (
      <div className="bg-white/10 rounded-lg p-3 text-white text-sm flex items-center gap-2">
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
        <span>Localisation en cours...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/20 rounded-lg p-3 text-white text-sm border border-red-500/50">
        <p className="mb-2">{error}</p>
        <button
          onClick={onRetry}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-xs font-semibold transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (location) {
    return (
      <div className="bg-white/10 rounded-lg p-3 text-white text-sm flex items-center gap-2">
        <span className="text-lg">📍</span>
        <div className="flex-1">
          {location.city ? (
            <>
              <p className="font-medium">{location.city}</p>
              {location.country && (
                <p className="text-white/70 text-xs">{location.country}</p>
              )}
            </>
          ) : (
            <>
              <p className="font-medium">Position détectée</p>
              <p className="text-white/70 text-xs">
                {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return null;
}
