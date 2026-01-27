import { useState } from 'react';
import { loadThresholds, saveThresholds, resetThresholds, DEFAULT_THRESHOLDS } from '../utils/thresholds';

/**
 * Settings modal for customizable thresholds
 */
export default function SettingsModal({ isOpen, onClose, onSave }) {
  const [thresholds, setThresholds] = useState(loadThresholds());

  const handleSave = () => {
    saveThresholds(thresholds);
    onSave(thresholds);
    onClose();
  };

  const handleReset = () => {
    const defaults = resetThresholds();
    setThresholds(defaults);
    saveThresholds(defaults);
    onSave(defaults);
  };

  const updateThreshold = (category, type, value) => {
    setThresholds(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: parseFloat(value)
      }
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-purple-700/90 backdrop-blur-sm px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚙️</span>
            <h2 className="text-xl font-bold text-white">Préférences</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-white/80 text-sm">
            Ajustez les seuils selon votre niveau et vos préférences. Les valeurs par défaut conviennent à la plupart des cyclistes.
          </p>

          {/* Wind Speed */}
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <span>💨</span>
              Vent moyen (km/h)
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-white/70 text-sm block mb-1">
                  GO si &lt; {thresholds.wind.go} km/h
                </label>
                <input
                  type="range"
                  min="0"
                  max="80"
                  step="5"
                  value={thresholds.wind.go}
                  onChange={(e) => updateThreshold('wind', 'go', e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-white/70 text-sm block mb-1">
                  RISQUÉ si &lt; {thresholds.wind.risky} km/h
                </label>
                <input
                  type="range"
                  min="0"
                  max="80"
                  step="5"
                  value={thresholds.wind.risky}
                  onChange={(e) => updateThreshold('wind', 'risky', e.target.value)}
                  className="w-full"
                />
              </div>
              <p className="text-white/50 text-xs">
                Au-delà: NO GO
              </p>
            </div>
          </div>

          {/* Gusts */}
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <span>🌪️</span>
              Rafales max (km/h)
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-white/70 text-sm block mb-1">
                  GO si &lt; {thresholds.gusts.go} km/h
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={thresholds.gusts.go}
                  onChange={(e) => updateThreshold('gusts', 'go', e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-white/70 text-sm block mb-1">
                  RISQUÉ si &lt; {thresholds.gusts.risky} km/h
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={thresholds.gusts.risky}
                  onChange={(e) => updateThreshold('gusts', 'risky', e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Precipitation Probability */}
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <span>💧</span>
              Probabilité de pluie (%)
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-white/70 text-sm block mb-1">
                  GO si &lt; {thresholds.precipitation_probability.go}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  value={thresholds.precipitation_probability.go}
                  onChange={(e) => updateThreshold('precipitation_probability', 'go', e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-white/70 text-sm block mb-1">
                  RISQUÉ si &lt; {thresholds.precipitation_probability.risky}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  value={thresholds.precipitation_probability.risky}
                  onChange={(e) => updateThreshold('precipitation_probability', 'risky', e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Precipitation Amount */}
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <span>🌧️</span>
              Précipitations (mm)
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-white/70 text-sm block mb-1">
                  RISQUÉ si &lt; {thresholds.precipitation.risky} mm
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="0.5"
                  value={thresholds.precipitation.risky}
                  onChange={(e) => updateThreshold('precipitation', 'risky', e.target.value)}
                  className="w-full"
                />
              </div>
              <p className="text-white/50 text-xs">
                GO si 0 mm, NO GO au-delà du seuil
              </p>
            </div>
          </div>

          {/* Temperature Min */}
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <span>🥶</span>
              Température minimale (°C)
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-white/70 text-sm block mb-1">
                  GO si &gt; {thresholds.temperature_min.go}°C
                </label>
                <input
                  type="range"
                  min="-20"
                  max="40"
                  step="1"
                  value={thresholds.temperature_min.go}
                  onChange={(e) => updateThreshold('temperature_min', 'go', e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-white/70 text-sm block mb-1">
                  RISQUÉ si &gt; {thresholds.temperature_min.risky}°C
                </label>
                <input
                  type="range"
                  min="-20"
                  max="40"
                  step="1"
                  value={thresholds.temperature_min.risky}
                  onChange={(e) => updateThreshold('temperature_min', 'risky', e.target.value)}
                  className="w-full"
                />
              </div>
              <p className="text-white/50 text-xs">
                En dessous: NO GO
              </p>
            </div>
          </div>

          {/* Temperature Max */}
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <span>🥵</span>
              Température maximale (°C)
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-white/70 text-sm block mb-1">
                  GO si &lt; {thresholds.temperature_max.go}°C
                </label>
                <input
                  type="range"
                  min="-20"
                  max="45"
                  step="1"
                  value={thresholds.temperature_max.go}
                  onChange={(e) => updateThreshold('temperature_max', 'go', e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-white/70 text-sm block mb-1">
                  RISQUÉ si &lt; {thresholds.temperature_max.risky}°C
                </label>
                <input
                  type="range"
                  min="-20"
                  max="45"
                  step="1"
                  value={thresholds.temperature_max.risky}
                  onChange={(e) => updateThreshold('temperature_max', 'risky', e.target.value)}
                  className="w-full"
                />
              </div>
              <p className="text-white/50 text-xs">
                Au-delà: NO GO
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-purple-700/90 backdrop-blur-sm px-6 py-4 border-t border-white/10 flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white rounded-lg py-3 font-semibold transition-colors"
          >
            Réinitialiser
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-white hover:bg-gray-100 text-purple-700 rounded-lg py-3 font-semibold transition-colors shadow-lg"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
