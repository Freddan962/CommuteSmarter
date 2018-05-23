'use strict';
const models = require('../models');
const sensor = require('../services/sensor.js');

module.exports = {
  name: 'Random Event Creation',
  interval: 3000,
  func: function() {
    sensor.getRandomEvent(models, () => {
        console.log("Called create random event!");
     })
  }
}
