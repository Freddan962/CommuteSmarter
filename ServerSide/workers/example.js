'use strict';
module.exports = {
  name: 'Example Worker',
  interval: 1500,
  func: function() {
    console.log("Running example worker");
  }
}