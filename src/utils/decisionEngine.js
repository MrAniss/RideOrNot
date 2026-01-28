import { loadThresholds } from './thresholds';

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
 * Evaluate a single criterion (standard: lower is better)
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
 * Evaluate temperature min (higher is better)
 * @param {number} value - Temperature value
 * @param {Object} threshold - Threshold configuration
 * @returns {string} Verdict for this criterion
 */
function evaluateTempMin(value, threshold) {
  if (value >= threshold.go) return VERDICT.GO;
  if (value >= threshold.risky) return VERDICT.RISKY;
  return VERDICT.NO_GO;
}

/**
 * Evaluate temperature max (lower is better)
 * @param {number} value - Temperature value
 * @param {Object} threshold - Threshold configuration
 * @returns {string} Verdict for this criterion
 */
function evaluateTempMax(value, threshold) {
  if (value <= threshold.go) return VERDICT.GO;
  if (value <= threshold.risky) return VERDICT.RISKY;
  return VERDICT.NO_GO;
}

/**
 * Main decision engine
 * Analyzes weather data and returns verdict
 * @param {Object} weatherWindow - Weather data for the ride duration
 * @param {Object} customThresholds - Optional custom thresholds (defaults to stored prefs)
 * @returns {Object} Verdict and detailed conditions
 */
export function analyzeConditions(weatherWindow, customThresholds = null) {
  const THRESHOLDS = customThresholds || loadThresholds();

  // Calculate statistics
  const tempStats = calculateStats(weatherWindow.temperature);
  const windStats = calculateStats(weatherWindow.windspeed);
  const gustStats = calculateStats(weatherWindow.windgusts);
  const precipProbStats = calculateStats(weatherWindow.precipitation_probability);
  const precipStats = calculateStats(weatherWindow.precipitation);
  const windDirStats = weatherWindow.winddirection ? calculateStats(weatherWindow.winddirection) : { avg: null };

  // Evaluate each criterion
  const verdicts = {
    wind: evaluateCriterion(windStats.avg, THRESHOLDS.wind),
    gusts: evaluateCriterion(gustStats.max, THRESHOLDS.gusts),
    precipProb: evaluateCriterion(precipProbStats.max, THRESHOLDS.precipitation_probability),
    precip: evaluateCriterion(precipStats.max, THRESHOLDS.precipitation),
    tempMin: evaluateTempMin(tempStats.min, THRESHOLDS.temperature_min),
    tempMax: evaluateTempMax(tempStats.max, THRESHOLDS.temperature_max)
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
        avg: Math.round(tempStats.avg),
        verdictMin: verdicts.tempMin,
        verdictMax: verdicts.tempMax
      },
      wind: {
        avg: Math.round(windStats.avg),
        max: Math.round(windStats.max),
        direction: windDirStats.avg !== null ? Math.round(windDirStats.avg) : null,
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
      color: 'bg-verdict-go',
      textColor: 'text-verdict-go',
      borderColor: 'border-verdict-go',
      bgOpacity: 'bg-verdict-go/15',
      message: 'Conditions optimales',
      emoji: '✅',
      title: 'GO !'
    },
    [VERDICT.RISKY]: {
      color: 'bg-verdict-risky',
      textColor: 'text-verdict-risky',
      borderColor: 'border-verdict-risky',
      bgOpacity: 'bg-verdict-risky/15',
      message: 'Faisable mais prudence',
      emoji: '⚠️',
      title: 'RISQUÉ'
    },
    [VERDICT.NO_GO]: {
      color: 'bg-verdict-nogo',
      textColor: 'text-verdict-nogo',
      borderColor: 'border-verdict-nogo',
      bgOpacity: 'bg-verdict-nogo/15',
      message: 'Reste au chaud',
      emoji: '❌',
      title: 'NO GO'
    }
  };

  return configs[verdict] || configs[VERDICT.GO];
}
