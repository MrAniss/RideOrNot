import { useState } from 'react';
import { getWeatherInfo } from '../utils/weatherApi';
import WindDirection from './WindDirection';

/**
 * Format time from ISO string
 */
function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

/**
 * Hourly forecast expandable section
 */
export default function HourlyForecast({ weatherWindow }) {
  const [expanded, setExpanded] = useState(false);

  if (!weatherWindow || !weatherWindow.time || weatherWindow.time.length === 0) {
    return null;
  }

  const hours = weatherWindow.time.length;

  return (
    <div className="w-full bg-bg-secondary border border-text-primary/20 rounded-lg overflow-hidden">
      {/* Header - Toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-accent/10 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">📊</span>
          <span className="text-text-primary font-body font-medium">
            Prévisions heure par heure
          </span>
          <span className="text-text-primary/50 text-sm font-body">
            ({hours}h)
          </span>
        </div>

        <svg
          className={`w-5 h-5 text-text-primary transition-transform ${
            expanded ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Hourly Data */}
      {expanded && (
        <div className="border-t border-text-primary/10 max-h-96 overflow-y-auto">
          {weatherWindow.time.map((time, index) => {
            const weatherInfo = getWeatherInfo(weatherWindow.weathercode[index]);
            const temp = weatherWindow.temperature[index];
            const wind = weatherWindow.windspeed[index];
            const windDir = weatherWindow.winddirection ? weatherWindow.winddirection[index] : null;
            const precip = weatherWindow.precipitation[index];
            const precipProb = weatherWindow.precipitation_probability[index];

            return (
              <div
                key={time}
                className="px-4 py-3 border-b border-text-primary/5 last:border-b-0 hover:bg-accent/10 transition-colors"
              >
                <div className="grid grid-cols-[60px_1fr_1fr_1fr] gap-3 items-center">
                  {/* Time */}
                  <div className="text-text-primary font-body font-medium text-sm">
                    {formatTime(time)}
                  </div>

                  {/* Weather + Temp */}
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{weatherInfo.icon}</span>
                    <div>
                      <p className="text-text-primary font-body font-medium text-sm">
                        {Math.round(temp)}°C
                      </p>
                      <p className="text-text-primary/50 text-xs font-body">
                        {weatherInfo.description}
                      </p>
                    </div>
                  </div>

                  {/* Wind */}
                  <div>
                    <p className="text-text-primary text-sm font-body font-medium">
                      {Math.round(wind)} km/h
                    </p>
                    {windDir !== null && windDir !== undefined && (
                      <div className="mt-1">
                        <WindDirection degrees={windDir} size="sm" />
                      </div>
                    )}
                  </div>

                  {/* Precipitation */}
                  <div className="text-right">
                    {precip > 0 || precipProb > 20 ? (
                      <>
                        <p className="text-accent text-sm font-body font-medium">
                          {precipProb}%
                        </p>
                        {precip > 0 && (
                          <p className="text-accent/80 text-xs font-body">
                            {precip.toFixed(1)} mm
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="text-text-primary/30 text-sm font-body">-</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
