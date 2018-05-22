'use strict';
const models = require('../models');
const sensor = require('../services/sensor.js');

module.exports = {
  name: 'Random Event Deletion',
  interval: 40000,
  func: function() {
    sensor.deleteRandomEvent(models,(() => {
      console.log("Called delete random event!");
    }));
  }
}
