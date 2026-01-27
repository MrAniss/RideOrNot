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
  // Create a mini window with just this hour
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
 * Visual timeline bar with color-coded segments
 */
export default function TimelineBar({ weatherWindow }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!weatherWindow || !weatherWindow.time || weatherWindow.time.length === 0) {
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
    <div className="w-full space-y-2">
      <h3 className="text-white text-sm font-semibold flex items-center gap-2">
        <span>📈</span>
        Timeline des conditions
      </h3>

      {/* Timeline Bar */}
      <div className="relative">
        {/* Segments */}
        <div className="flex rounded-lg overflow-hidden h-12">
          {segments.map((segment, index) => {
            const config = getVerdictConfig(segment.verdict);
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={segment.time}
                className="relative flex-1 cursor-pointer transition-all"
                style={{
                  backgroundColor: config.color.replace('bg-', '#'),
                  opacity: isHovered ? 1 : 0.85,
                  transform: isHovered ? 'scaleY(1.1)' : 'scaleY(1)'
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                title={`${formatTimeShort(segment.time)} - ${segment.temp}°C, ${segment.wind} km/h`}
              >
                {/* Hour label on first, middle, and last segments */}
                {(index === 0 || index === Math.floor(hours / 2) || index === hours - 1) && (
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-white/70 text-xs whitespace-nowrap">
                    {formatTimeShort(segment.time)}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Hover Tooltip */}
        {hoveredIndex !== null && (
          <div className="absolute top-full mt-8 left-0 right-0 bg-white/95 rounded-lg p-3 shadow-xl z-10 text-gray-900 text-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">
                  {formatTimeShort(segments[hoveredIndex].time)}
                </p>
                <p className="text-xs text-gray-600">
                  {segments[hoveredIndex].temp}°C • {segments[hoveredIndex].wind} km/h
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-white text-xs font-bold ${getVerdictConfig(segments[hoveredIndex].verdict).color}`}>
                {getVerdictConfig(segments[hoveredIndex].verdict).title}
              </div>
            </div>
            {segments[hoveredIndex].precip > 20 && (
              <p className="text-xs text-blue-600 mt-1">
                💧 Pluie possible: {segments[hoveredIndex].precip}%
              </p>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-xs text-white/70 pt-6">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-green-500"></div>
          <span>GO</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-orange-500"></div>
          <span>RISQUÉ</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-red-500"></div>
          <span>NO GO</span>
        </div>
      </div>
    </div>
  );
}
