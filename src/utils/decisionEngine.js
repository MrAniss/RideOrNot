/**
 * Decision thresholds for cycling conditions
 */
const THRESHOLDS = {
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
  }
};

export const VERDICT = {
  GO: 'GO',
  RISKY: 'RISKY',
  NO_GO: 'NO_GO'
};

/**
 * Calculate statistics from array
 * @param {Array<number>} values
 * @returns {Object} min, max, avg
 */
function calculateStats(values) {
  const filtered = values.filter(v => v !== null && v !== undefined);

  if (filtered.length === 0) {
    return { min: 0, max: 0, avg: 0 };
  }

  return {
    min: Math.min(...filtered),
    max: Math.max(...filtered),
    avg: filtered.reduce((a, b) => a + b, 0) / filtered.length
  };
}

/**
 * Evaluate a single criterion
 * @param {number} value - Value to evaluate
 * @param {Object} threshold - Threshold configuration
 * @returns {string} Verdict for this criterion
 */
function evaluateCriterion(value, threshold) {
  if (value <= threshold.go) return VERDICT.GO;
  if (value <= threshold.risky) return VERDICT.RISKY;
  return VERDICT.NO_GO;
}

/**
 * Main decision engine
 * Analyzes weather data and returns verdict
 * @param {Object} weatherWindow - Weather data for the ride duration
 * @returns {Object} Verdict and detailed conditions
 */
export function analyzeConditions(weatherWindow) {
  // Calculate statistics
  const tempStats = calculateStats(weatherWindow.temperature);
  const windStats = calculateStats(weatherWindow.windspeed);
  const gustStats = calculateStats(weatherWindow.windgusts);
  const precipProbStats = calculateStats(weatherWindow.precipitation_probability);
  const precipStats = calculateStats(weatherWindow.precipitation);

  // Evaluate each criterion
  const verdicts = {
    wind: evaluateCriterion(windStats.avg, THRESHOLDS.wind),
    gusts: evaluateCriterion(gustStats.max, THRESHOLDS.gusts),
    precipProb: evaluateCriterion(precipProbStats.max, THRESHOLDS.precipitation_probability),
    precip: evaluateCriterion(precipStats.max, THRESHOLDS.precipitation)
  };

  // Overall verdict logic:
  // - If ANY criterion is NO_GO → NO_GO
  // - Else if ANY criterion is RISKY → RISKY
  // - Else → GO
  let finalVerdict = VERDICT.GO;

  const verdictValues = Object.values(verdicts);

  if (verdictValues.includes(VERDICT.NO_GO)) {
    finalVerdict = VERDICT.NO_GO;
  } else if (verdictValues.includes(VERDICT.RISKY)) {
    finalVerdict = VERDICT.RISKY;
  }

  // Get most common weather code
  const weatherCode = weatherWindow.weathercode[0] || 0;

  return {
    verdict: finalVerdict,
    conditions: {
      temperature: {
        min: Math.round(tempStats.min),
        max: Math.round(tempStats.max),
        avg: Math.round(tempStats.avg)
      },
      wind: {
        avg: Math.round(windStats.avg),
        max: Math.round(windStats.max),
        verdict: verdicts.wind
      },
      gusts: {
        max: Math.round(gustStats.max),
        verdict: verdicts.gusts
      },
      precipitation: {
        probability: Math.round(precipProbStats.max),
        amount: Math.round(precipStats.max * 10) / 10,
        verdict: verdicts.precip
      },
      weatherCode
    }
  };
}

/**
 * Get verdict configuration (color, message, emoji)
 * @param {string} verdict - Verdict type
 * @returns {Object} Verdict configuration
 */
export function getVerdictConfig(verdict) {
  const configs = {
    [VERDICT.GO]: {
      color: 'bg-green-500',
      textColor: 'text-green-500',
      borderColor: 'border-green-500',
      message: 'Conditions optimales',
      emoji: '✅',
      title: 'GO !'
    },
    [VERDICT.RISKY]: {
      color: 'bg-orange-500',
      textColor: 'text-orange-500',
      borderColor: 'border-orange-500',
      message: 'Faisable mais prudence',
      emoji: '⚠️',
      title: 'RISQUÉ'
    },
    [VERDICT.NO_GO]: {
      color: 'bg-red-500',
      textColor: 'text-red-500',
      borderColor: 'border-red-500',
      message: 'Reste au chaud',
      emoji: '❌',
      title: 'NO GO'
    }
  };

  return configs[verdict] || configs[VERDICT.GO];
}
