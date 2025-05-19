/**
 * Analyzes temperature data from history array
 * @param {Array} history - Array of objects with temp property
 * @returns {Object} Min, max, and avg temperature values
 */
function analyzeTemperaturesFromArray(history) {
  if (!history.length) return { min: null, max: null, avg: null };
  const temps = history.map(entry => entry.temp);
  const min = Math.min(...temps);
  const max = Math.max(...temps);
  const avg = Number((temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(2));
  return { min, max, avg };
}

/**
 * Manages weather station system state
 */
class WeatherStationState {
  constructor() {
    this.state = "Running";
  }
  setState(newState) {
    this.state = newState;
  }
  getState() {
    return this.state;
  }
}

// Export for Node.js
module.exports = { analyzeTemperaturesFromArray, WeatherStationState };
