import { getCardinalDirection } from '../utils/weatherApi';

/**
 * Wind direction arrow and cardinal direction display
 * @param {number} degrees - Wind direction in degrees (0-360)
 * @param {string} size - Size class (sm, md, lg)
 */
export default function WindDirection({ degrees, size = 'md' }) {
  const cardinal = getCardinalDirection(degrees);

  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base'
  };

  const sizeClass = sizeClasses[size] || sizeClasses.md;

  if (degrees === null || degrees === undefined) {
    return (
      <div className="flex items-center gap-1">
        <div className={`${sizeClass} flex items-center justify-center text-white/50`}>
          -
        </div>
        <span className="text-white/50 text-sm font-medium">-</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {/* Arrow pointing in wind direction */}
      <div
        className={`${sizeClass} flex items-center justify-center`}
        style={{ transform: `rotate(${degrees}deg)` }}
        title={`Vent vers ${cardinal} (${Math.round(degrees)}°)`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>

      {/* Cardinal direction label */}
      <span className="text-white font-medium text-sm">
        {cardinal}
      </span>
    </div>
  );
}
