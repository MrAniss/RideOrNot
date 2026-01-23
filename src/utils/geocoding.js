/**
 * Reverse geocoding using Open-Meteo Geocoding API
 * Converts coordinates to city name
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Promise<Object>} Location info with city name
 */
export async function reverseGeocode(latitude, longitude) {
  // Using Nominatim (OpenStreetMap) - free and no API key required
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=fr`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'RideOrNot PWA' // Required by Nominatim
      }
    });

    if (!response.ok) {
      throw new Error('Geocoding failed');
    }

    const data = await response.json();

    // Extract city name from address
    const address = data.address || {};
    const city =
      address.city ||
      address.town ||
      address.village ||
      address.municipality ||
      address.county ||
      'Position inconnue';

    const country = address.country || '';

    return {
      city,
      country,
      fullAddress: data.display_name || '',
      raw: data
    };
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    // Return a fallback without throwing
    return {
      city: null,
      country: null,
      fullAddress: null,
      error: error.message
    };
  }
}
