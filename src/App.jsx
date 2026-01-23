import { useState } from 'react';
import { useGeolocation } from './hooks/useGeolocation';
import { useWeather } from './hooks/useWeather';
import DurationPicker from './components/DurationPicker';
import LocationDisplay from './components/LocationDisplay';
import Verdict from './components/Verdict';
import WeatherDetails from './components/WeatherDetails';

function App() {
  const [duration, setDuration] = useState(2);
  const { location, error: geoError, loading: geoLoading, requestLocation } = useGeolocation();
  const { analysis, loading: weatherLoading, error: weatherError, analyzeWeather } = useWeather();

  const handleAnalyze = () => {
    if (location) {
      analyzeWeather(location.latitude, location.longitude, duration);
    }
  };

  const canAnalyze = location && !geoLoading && !weatherLoading;

  return (
    <div className="w-full max-w-md">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            <span className="text-5xl">🚴</span>
            <br />
            RideOrNot
          </h1>
          <p className="text-white/80 text-sm">
            La météo intelligente pour cyclistes
          </p>
        </div>

        {/* Location */}
        <LocationDisplay
          location={location}
          loading={geoLoading}
          error={geoError}
          onRetry={requestLocation}
        />

        {/* Duration Picker */}
        <DurationPicker
          onDurationChange={setDuration}
          disabled={weatherLoading}
        />

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={!canAnalyze}
          className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all ${
            canAnalyze
              ? 'bg-white text-purple-700 hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:scale-105'
              : 'bg-white/20 text-white/50 cursor-not-allowed'
          }`}
        >
          {weatherLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-purple-700 border-t-transparent"></div>
              Analyse en cours...
            </span>
          ) : (
            'Analyser les conditions'
          )}
        </button>

        {/* Weather Error */}
        {weatherError && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-white text-sm">
            <p className="font-semibold mb-1">Erreur</p>
            <p>{weatherError}</p>
          </div>
        )}

        {/* Results */}
        {analysis && (
          <div className="space-y-4 animate-fade-in">
            <Verdict verdict={analysis.verdict} />
            <WeatherDetails
              conditions={analysis.conditions}
              duration={analysis.duration}
            />
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-white/50 text-xs pt-4 border-t border-white/10">
          <p>Données météo fournies par Open-Meteo</p>
          <p className="mt-1">
            Made with ❤️ for cyclists
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
