/**
 * Fetch weather data from Open-Meteo API
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Promise<Object>} Weather data
 */
export async function fetchWeather(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation_probability,precipitation,windspeed_10m,windgusts_10m,weathercode&timezone=auto`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  return response.json();
}

/**
 * Get current hour index in the hourly data
 * @param {Array<string>} timeArray - Array of ISO time strings
 * @returns {number} Index of current hour
 */
export function getCurrentHourIndex(timeArray) {
  const now = new Date();
  const currentHour = now.toISOString().slice(0, 13) + ':00';

  return timeArray.findIndex(time => time.startsWith(currentHour.slice(0, 13)));
}

/**
 * Extract weather data for a specific time window
 * @param {Object} weatherData - Full weather data from API
 * @param {number} durationHours - Duration in hours
 * @returns {Object} Extracted weather window
 */
export function extractWeatherWindow(weatherData, durationHours) {
  const startIndex = getCurrentHourIndex(weatherData.hourly.time);

  if (startIndex === -1) {
    throw new Error('Could not find current time in weather data');
  }

  const endIndex = startIndex + durationHours;

  return {
    temperature: weatherData.hourly.temperature_2m.slice(startIndex, endIndex),
    precipitation_probability: weatherData.hourly.precipitation_probability.slice(startIndex, endIndex),
    precipitation: weatherData.hourly.precipitation.slice(startIndex, endIndex),
    windspeed: weatherData.hourly.windspeed_10m.slice(startIndex, endIndex),
    windgusts: weatherData.hourly.windgusts_10m.slice(startIndex, endIndex),
    weathercode: weatherData.hourly.weathercode.slice(startIndex, endIndex),
    time: weatherData.hourly.time.slice(startIndex, endIndex)
  };
}

/**
 * Weather code descriptions
 * https://open-meteo.com/en/docs
 */
export const WEATHER_CODES = {
  0: { description: 'Ciel dégagé', icon: '☀️' },
  1: { description: 'Principalement dégagé', icon: '🌤️' },
  2: { description: 'Partiellement nuageux', icon: '⛅' },
  3: { description: 'Couvert', icon: '☁️' },
  45: { description: 'Brouillard', icon: '🌫️' },
  48: { description: 'Brouillard givrant', icon: '🌫️' },
  51: { description: 'Bruine légère', icon: '🌦️' },
  53: { description: 'Bruine modérée', icon: '🌦️' },
  55: { description: 'Bruine dense', icon: '🌧️' },
  61: { description: 'Pluie légère', icon: '🌧️' },
  63: { description: 'Pluie modérée', icon: '🌧️' },
  65: { description: 'Pluie forte', icon: '⛈️' },
  71: { description: 'Neige légère', icon: '🌨️' },
  73: { description: 'Neige modérée', icon: '❄️' },
  75: { description: 'Neige forte', icon: '❄️' },
  80: { description: 'Averses légères', icon: '🌦️' },
  81: { description: 'Averses modérées', icon: '🌧️' },
  82: { description: 'Averses violentes', icon: '⛈️' },
  95: { description: 'Orage', icon: '⛈️' },
  96: { description: 'Orage avec grêle légère', icon: '⛈️' },
  99: { description: 'Orage avec grêle forte', icon: '⛈️' }
};

/**
 * Get weather description from code
 * @param {number} code - Weather code
 * @returns {Object} Weather description and icon
 */
export function getWeatherInfo(code) {
  return WEATHER_CODES[code] || { description: 'Inconnu', icon: '❓' };
}
