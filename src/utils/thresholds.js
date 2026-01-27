/**
 * Default thresholds for weather conditions
 */
export const DEFAULT_THRESHOLDS = {
  wind: {
    go: 20,      // < 20 km/h
    risky: 35    // 20-35 km/h, > 35 = no go
  },
  gusts: {
    go: 35,      // < 35 km/h
    risky: 50    // 35-50 km/h, > 50 = no go
  },
  precipitation_probability: {
    go: 20,      // < 20%
    risky: 50    // 20-50%, > 50 = no go
  },
  precipitation: {
    go: 0,       // 0 mm
    risky: 2     // 0-2 mm, > 2 = no go
  },
  temperature_min: {
    go: 5,       // > 5°C
    risky: 0     // 0-5°C, < 0 = no go
  },
  temperature_max: {
    go: 32,      // < 32°C
    risky: 38    // 32-38°C, > 38 = no go
  }
};

/**
 * Load thresholds from localStorage or use defaults
 */
export function loadThresholds() {
  try {
    const stored = localStorage.getItem('weatherThresholds');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading thresholds:', error);
  }
  return DEFAULT_THRESHOLDS;
}

/**
 * Save thresholds to localStorage
 */
export function saveThresholds(thresholds) {
  try {
    localStorage.setItem('weatherThresholds', JSON.stringify(thresholds));
  } catch (error) {
    console.error('Error saving thresholds:', error);
  }
}

/**
 * Reset thresholds to defaults
 */
export function resetThresholds() {
  localStorage.removeItem('weatherThresholds');
  return DEFAULT_THRESHOLDS;
}
