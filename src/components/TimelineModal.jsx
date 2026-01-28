import { useState } from 'react';
import { analyzeConditions, getVerdictConfig } from '../utils/decisionEngine';

/**
 * Format time from ISO string (short)
 */
function formatTimeShort(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit' });
}

/**
 * Analyze a single hour segment
 */
function analyzeHourSegment(weatherWindow, index) {
  const miniWindow = {
    temperature: [weatherWindow.temperature[index]],
    precipitation_probability: [weatherWindow.precipitation_probability[index]],
    precipitation: [weatherWindow.precipitation[index]],
    windspeed: [weatherWindow.windspeed[index]],
    windgusts: [weatherWindow.windgusts[index]],
    weathercode: [weatherWindow.weathercode[index]],
    time: [weatherWindow.time[index]]
  };

  const result = analyzeConditions(miniWindow);
  return result.verdict;
}

/**
 * Timeline modal with visual bar
 */
export default function TimelineModal({ isOpen, onClose, weatherWindow }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!isOpen || !weatherWindow || !weatherWindow.time || weatherWindow.time.length === 0) {
    return null;
  }

  const hours = weatherWindow.time.length;
  const segments = weatherWindow.time.map((time, index) => ({
    time,
    verdict: analyzeHourSegment(weatherWindow, index),
    temp: Math.round(weatherWindow.temperature[index]),
    wind: Math.round(weatherWindow.windspeed[index]),
    precip: weatherWindow.precipitation_probability[index]
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-bg-secondary border border-text-primary/20 rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-bg-primary/90 backdrop-blur-sm px-6 py-4 border-b border-text-primary/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📈</span>
            <h2 className="text-xl font-heading font-bold text-text-primary">Timeline des conditions</h2>
          </div>
          <button
            onClick={onClose}
            className="text-text-primary/70 hover:text-text-primary text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-text-primary/80 text-sm font-body">
            Visualisez l'évolution des conditions heure par heure. Chaque segment représente une heure de votre sortie.
          </p>

          {/* Timeline Bar */}
          <div className="relative">
            {/* Segments */}
            <div className="flex rounded-lg overflow-hidden h-16 shadow-lg">
              {segments.map((segment, index) => {
                const config = getVerdictConfig(segment.verdict);
                const isHovered = hoveredIndex === index;

                return (
                  <div
                    key={segment.time}
                    className="relative flex-1 cursor-pointer transition-all"
                    style={{
                      backgroundColor: isHovered ? config.color.replace('bg-', '#').replace('500', '400') : config.color.replace('bg-', '#').replace('500', '500'),
                      opacity: isHovered ? 1 : 0.9,
                      transform: isHovered ? 'scaleY(1.15)' : 'scaleY(1)'
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Hour labels */}
                    {(index === 0 || index === Math.floor(hours / 2) || index === hours - 1) && (
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-text-primary/70 text-xs whitespace-nowrap font-body font-medium">
                        {formatTimeShort(segment.time)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Spacing for labels */}
            <div className="h-8"></div>

            {/* Hover Tooltip */}
            {hoveredIndex !== null && (
              <div className="bg-bg-primary border border-text-primary/20 rounded-lg p-4 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-body font-bold text-lg text-text-primary">
                      {formatTimeShort(segments[hoveredIndex].time)}
                    </p>
                    <p className="text-sm font-body text-text-primary/70">
                      {segments[hoveredIndex].temp}°C • {segments[hoveredIndex].wind} km/h
                    </p>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-sm font-body font-bold ${getVerdictConfig(segments[hoveredIndex].verdict).bgOpacity} ${getVerdictConfig(segments[hoveredIndex].verdict).textColor}`}>
                    {getVerdictConfig(segments[hoveredIndex].verdict).title}
                  </div>
                </div>
                {segments[hoveredIndex].precip > 20 && (
                  <p className="text-sm font-body text-accent">
                    💧 Pluie possible: {segments[hoveredIndex].precip}%
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 pt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-verdict-go"></div>
              <span className="text-text-primary text-sm font-body font-medium">GO</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-verdict-risky"></div>
              <span className="text-text-primary text-sm font-body font-medium">RISQUÉ</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-verdict-nogo"></div>
              <span className="text-text-primary text-sm font-body font-medium">NO GO</span>
            </div>
          </div>

          {/* Details list */}
          <div className="bg-bg-primary/50 border border-text-primary/20 rounded-lg p-4 space-y-2">
            <h3 className="text-text-primary font-body font-semibold mb-3">Détail par heure :</h3>
            <div className="grid grid-cols-4 gap-2 text-xs text-text-primary/70 font-body font-medium mb-2">
              <div>Heure</div>
              <div>Temp</div>
              <div>Vent</div>
              <div>Verdict</div>
            </div>
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {segments.map((segment, index) => (
                <div
                  key={segment.time}
                  className="grid grid-cols-4 gap-2 text-sm text-text-primary py-2 px-2 rounded hover:bg-accent/10 transition-colors"
                >
                  <div className="font-body font-medium">{formatTimeShort(segment.time)}</div>
                  <div className="font-body">{segment.temp}°C</div>
                  <div className="font-body">{segment.wind} km/h</div>
                  <div>
                    <span className={`text-xs font-body font-bold ${getVerdictConfig(segment.verdict).textColor}`}>
                      {getVerdictConfig(segment.verdict).emoji} {getVerdictConfig(segment.verdict).title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-bg-primary/90 backdrop-blur-sm px-6 py-4 border-t border-text-primary/10">
          <button
            onClick={onClose}
            className="w-full bg-accent hover:bg-accent-hover text-bg-primary rounded-lg py-3 font-body font-semibold transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
