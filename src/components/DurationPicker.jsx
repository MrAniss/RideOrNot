import { useState } from 'react';

const PRESET_DURATIONS = [1, 2, 3, 4];

export default function DurationPicker({ onDurationChange, disabled }) {
  const [duration, setDuration] = useState(2);
  const [customMode, setCustomMode] = useState(false);

  const handlePresetClick = (hours) => {
    setDuration(hours);
    setCustomMode(false);
    onDurationChange(hours);
  };

  const handleCustomChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    const clampedValue = Math.min(Math.max(value, 1), 12);
    setDuration(clampedValue);
    onDurationChange(clampedValue);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium font-body text-text-primary mb-3">
        Durée de la sortie
      </label>

      <div className="grid grid-cols-4 gap-2 mb-3">
        {PRESET_DURATIONS.map((hours) => (
          <button
            key={hours}
            onClick={() => handlePresetClick(hours)}
            disabled={disabled}
            className={`py-3 px-4 rounded-lg font-body font-semibold transition-all border ${
              duration === hours && !customMode
                ? 'bg-accent text-bg-primary border-accent shadow-lg'
                : 'bg-bg-secondary text-text-primary border-text-primary/20 hover:border-accent'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {hours}h
          </button>
        ))}
      </div>

      <button
        onClick={() => setCustomMode(!customMode)}
        disabled={disabled}
        className={`w-full py-2 px-4 rounded-lg text-sm font-body transition-all border ${
          customMode
            ? 'bg-accent text-bg-primary border-accent'
            : 'bg-bg-secondary text-text-primary border-text-primary/20 hover:border-accent'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {customMode ? 'Durée personnalisée' : 'Personnaliser'}
      </button>

      {customMode && (
        <div className="mt-3">
          <input
            type="number"
            min="1"
            max="12"
            value={duration}
            onChange={handleCustomChange}
            disabled={disabled}
            className="w-full px-4 py-2 rounded-lg bg-bg-secondary border border-text-primary/20 text-text-primary font-body font-semibold text-center focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <p className="text-text-primary/70 text-xs mt-1 text-center font-body">
            1 à 12 heures
          </p>
        </div>
      )}
    </div>
  );
}
