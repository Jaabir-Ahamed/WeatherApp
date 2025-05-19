const { expect } = require('chai');
const { analyzeTemperaturesFromArray, WeatherStationState } = require('../weather.js');

describe('Weather Station Core Logic', function() {
  describe('analyzeTemperaturesFromArray', function() {
    it('should return correct min, max, and avg for a normal array', function() {
      const history = [{ temp: 10 }, { temp: 20 }, { temp: 30 }];
      const result = analyzeTemperaturesFromArray(history);
      expect(result.min).to.equal(10);
      expect(result.max).to.equal(30);
      expect(result.avg).to.equal(20);
    });

    it('should handle empty history', function() {
      const result = analyzeTemperaturesFromArray([]);
      expect(result.min).to.be.null;
      expect(result.max).to.be.null;
      expect(result.avg).to.be.null;
    });

    // Add more tests...
  });

  describe('WeatherStationState', function() {
    it('should initialize in Running state', function() {
      const ws = new WeatherStationState();
      expect(ws.getState()).to.equal('Running');
    });

    // Add more tests...
  });
});
