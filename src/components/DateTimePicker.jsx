import { useState } from 'react';

const QUICK_PRESETS = [
  { id: 'now', label: 'Maintenant', offsetHours: 0 },
  { id: '1h', label: 'Dans 1h', offsetHours: 1 },
  { id: '2h', label: 'Dans 2h', offsetHours: 2 },
  { id: 'tomorrow-morning', label: 'Demain 8h', customTime: true, hour: 8 },
  { id: 'tomorrow-afternoon', label: 'Demain 14h', customTime: true, hour: 14 }
];

/**
 * Get tomorrow at specific hour
 */
function getTomorrowAt(hour) {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(hour, 0, 0, 0);
  return date;
}

/**
 * Get date from offset hours
 */
function getDateFromOffset(offsetHours) {
  const date = new Date();
  date.setHours(date.getHours() + offsetHours);
  return date;
}

/**
 * Format date for datetime-local input
 */
function formatDateTimeLocal(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

/**
 * Format date for display
 */
function formatDateDisplay(date) {
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const isTomorrow = date.toDateString() === new Date(now.getTime() + 86400000).toDateString();

  const timeStr = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  if (isToday) {
    return `Aujourd'hui à ${timeStr}`;
  } else if (isTomorrow) {
    return `Demain à ${timeStr}`;
  } else {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

export default function DateTimePicker({ onChange, disabled }) {
  const [selectedPreset, setSelectedPreset] = useState('now');
  const [customDate, setCustomDate] = useState(formatDateTimeLocal(new Date()));
  const [showCustom, setShowCustom] = useState(false);

  const handlePresetClick = (preset) => {
    setSelectedPreset(preset.id);
    setShowCustom(false);

    let departureDate;
    if (preset.customTime) {
      departureDate = getTomorrowAt(preset.hour);
    } else {
      departureDate = getDateFromOffset(preset.offsetHours);
    }

    onChange(departureDate);
  };

  const handleCustomClick = () => {
    setShowCustom(true);
    setSelectedPreset('custom');
    const date = new Date(customDate);
    onChange(date);
  };

  const handleCustomDateChange = (e) => {
    const value = e.target.value;
    setCustomDate(value);
    const date = new Date(value);

    // Check if date is valid and not more than 7 days
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);

    if (date <= maxDate && date >= new Date()) {
      onChange(date);
    }
  };

  // Get max date (7 days from now)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7);
  const maxDateStr = formatDateTimeLocal(maxDate);

  // Get min date (now)
  const minDateStr = formatDateTimeLocal(new Date());

  return (
    <div className="space-y-3">
      <label className="text-white font-semibold text-sm">
        Quand partez-vous ?
      </label>

      {/* Quick Presets */}
      <div className="grid grid-cols-3 gap-2">
        {QUICK_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handlePresetClick(preset)}
            disabled={disabled}
            className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              selectedPreset === preset.id
                ? 'bg-white text-purple-700 shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/30'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {preset.label}
          </button>
        ))}

        <button
          onClick={handleCustomClick}
          disabled={disabled}
          className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
            selectedPreset === 'custom'
              ? 'bg-white text-purple-700 shadow-lg'
              : 'bg-white/20 text-white hover:bg-white/30'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          📅 Autre
        </button>
      </div>

      {/* Custom DateTime Input */}
      {showCustom && (
        <div className="bg-white/10 rounded-lg p-3">
          <input
            type="datetime-local"
            value={customDate}
            onChange={handleCustomDateChange}
            min={minDateStr}
            max={maxDateStr}
            disabled={disabled}
            className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <p className="text-white/70 text-xs mt-2">
            Maximum 7 jours à l'avance
          </p>
        </div>
      )}

      {/* Selected Time Display */}
      {selectedPreset !== 'custom' && selectedPreset !== 'now' && (
        <div className="bg-white/10 rounded-lg p-2 text-white text-xs text-center">
          {(() => {
            const preset = QUICK_PRESETS.find(p => p.id === selectedPreset);
            const date = preset.customTime
              ? getTomorrowAt(preset.hour)
              : getDateFromOffset(preset.offsetHours);
            return formatDateDisplay(date);
          })()}
        </div>
      )}
    </div>
  );
}
