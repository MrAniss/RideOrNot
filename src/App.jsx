import { useState } from 'react';
import { useGeolocation } from './hooks/useGeolocation';
import { useWeather } from './hooks/useWeather';
import DurationPicker from './components/DurationPicker';
import DateTimePicker from './components/DateTimePicker';
import LocationSearch from './components/LocationSearch';
import Verdict from './components/Verdict';
import WeatherDetails from './components/WeatherDetails';
import HourlyForecast from './components/HourlyForecast';
import TimelineModal from './components/TimelineModal';
import SettingsModal from './components/SettingsModal';

function App() {
  const [duration, setDuration] = useState(2);
  const [departureTime, setDepartureTime] = useState(new Date());
  const [showSettings, setShowSettings] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [manualLocation, setManualLocation] = useState(null);

  const { location: geoLocation, error: geoError, loading: geoLoading, requestLocation } = useGeolocation();
  const { analysis, weatherWindow, loading: weatherLoading, error: weatherError, analyzeWeather } = useWeather();

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
  };

  const handleUseGeolocation = () => {
    setManualLocation(null);
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
      <div className="bg-bg-secondary border border-text-primary/20 rounded-2xl shadow-2xl p-6 space-y-6">
        {/* Header with Settings */}
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-3 mb-2">
              <img src="/logo.svg" alt="RideOrNot" className="w-12 h-12" />
              <h1 className="text-4xl font-heading font-bold text-text-primary">
                RideOrNot
              </h1>
            </div>
            <p className="text-text-primary/80 text-sm font-body">
              La météo intelligente pour cyclistes
            </p>
          </div>
          <button
            onClick={() => setShowSettings(true)}
            className="absolute top-6 right-6 bg-bg-primary/80 hover:bg-accent/20 border border-text-primary/20 text-text-primary rounded-xl p-2 transition-colors"
            title="Paramètres"
          >
            <span className="text-xl">⚙️</span>
          </button>
        </div>

        {/* Location - Search with integrated Display */}
        <LocationSearch
          onLocationSelect={handleLocationSelect}
          onUseGeolocation={handleUseGeolocation}
          location={activeLocation}
          loading={geoLoading}
          error={geoError}
        />

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
          className={`w-full py-4 px-6 rounded-xl font-heading font-bold text-lg transition-all ${
            canAnalyze
              ? 'bg-accent text-bg-primary hover:bg-accent-hover shadow-lg hover:shadow-xl transform hover:scale-105'
              : 'bg-bg-primary/50 border border-text-primary/20 text-text-primary/50 cursor-not-allowed'
          }`}
        >
          {weatherLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-bg-primary border-t-transparent"></div>
              Analyse en cours...
            </span>
          ) : (
            'Analyser les conditions'
          )}
        </button>

        {/* Weather Error */}
        {weatherError && (
          <div className="bg-verdict-nogo/20 border border-verdict-nogo rounded-lg p-4 text-text-primary text-sm font-body">
            <p className="font-semibold mb-1">Erreur</p>
            <p>{weatherError}</p>
          </div>
        )}

        {/* Results */}
        {analysis && weatherWindow && (
          <div className="space-y-4 animate-fade-in">
            <Verdict verdict={analysis.verdict} />

            {/* Timeline Button */}
            <button
              onClick={() => setShowTimeline(true)}
              className="w-full bg-white/10 hover:bg-white/20 text-white rounded-lg py-3 px-4 text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <span>📈</span>
              Voir la timeline des conditions
            </button>

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

      {/* Timeline Modal */}
      <TimelineModal
        isOpen={showTimeline}
        onClose={() => setShowTimeline(false)}
        weatherWindow={weatherWindow}
      />
    </div>
  );
}

export default App;
