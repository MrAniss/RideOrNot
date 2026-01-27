import { useState, useEffect } from 'react';
import { useGeolocation } from './hooks/useGeolocation';
import { useWeather } from './hooks/useWeather';
import DurationPicker from './components/DurationPicker';
import DateTimePicker from './components/DateTimePicker';
import LocationDisplay from './components/LocationDisplay';
import LocationSearch from './components/LocationSearch';
import Verdict from './components/Verdict';
import WeatherDetails from './components/WeatherDetails';
import HourlyForecast from './components/HourlyForecast';
import TimelineBar from './components/TimelineBar';
import SettingsModal from './components/SettingsModal';

function App() {
  const [duration, setDuration] = useState(2);
  const [departureTime, setDepartureTime] = useState(new Date());
  const [showLocationSearch, setShowLocationSearch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [manualLocation, setManualLocation] = useState(null);

  const { location: geoLocation, error: geoError, loading: geoLoading, requestLocation } = useGeolocation();
  const { analysis, weatherWindow, loading: weatherLoading, error: weatherError, analyzeWeather } = useWeather();

  // Auto-request geolocation on mount
  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  // Determine which location to use (manual or geo)
  const activeLocation = manualLocation || geoLocation;

  const handleAnalyze = () => {
    if (activeLocation) {
      analyzeWeather(
        activeLocation.latitude,
        activeLocation.longitude,
        duration,
        departureTime
      );
    }
  };

  const handleLocationSelect = (location) => {
    setManualLocation(location);
    setShowLocationSearch(false);
  };

  const handleUseGeolocation = () => {
    setManualLocation(null);
    setShowLocationSearch(false);
    requestLocation();
  };

  const handleSettingsSave = () => {
    // Re-analyze with new thresholds if we have previous analysis
    if (analysis && activeLocation) {
      analyzeWeather(
        activeLocation.latitude,
        activeLocation.longitude,
        duration,
        departureTime
      );
    }
  };

  const canAnalyze = activeLocation && !geoLoading && !weatherLoading;

  return (
    <div className="w-full max-w-2xl">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-6 space-y-6">
        {/* Header with Settings */}
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-white mb-2">
              <span className="text-5xl">🚴</span>
              <br />
              RideOrNot
            </h1>
            <p className="text-white/80 text-sm">
              La météo intelligente pour cyclistes
            </p>
          </div>
          <button
            onClick={() => setShowSettings(true)}
            className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white rounded-lg p-2 transition-colors"
            title="Paramètres"
          >
            <span className="text-xl">⚙️</span>
          </button>
        </div>

        {/* Location - Display or Search */}
        {!showLocationSearch ? (
          <div className="space-y-2">
            <LocationDisplay
              location={activeLocation}
              loading={geoLoading}
              error={geoError}
              onRetry={requestLocation}
            />
            <button
              onClick={() => setShowLocationSearch(true)}
              className="text-white/70 hover:text-white text-sm transition-colors"
            >
              📍 Changer de lieu
            </button>
          </div>
        ) : (
          <LocationSearch
            onLocationSelect={handleLocationSelect}
            onUseGeolocation={handleUseGeolocation}
          />
        )}

        {/* DateTime Picker */}
        <DateTimePicker
          onChange={setDepartureTime}
          disabled={weatherLoading}
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
        {analysis && weatherWindow && (
          <div className="space-y-4 animate-fade-in">
            <Verdict verdict={analysis.verdict} />

            <TimelineBar weatherWindow={weatherWindow} />

            <WeatherDetails
              conditions={analysis.conditions}
              duration={analysis.duration}
            />

            <HourlyForecast weatherWindow={weatherWindow} />
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

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSave={handleSettingsSave}
      />
    </div>
  );
}

export default App;
