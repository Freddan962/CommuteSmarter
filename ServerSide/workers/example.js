'use strict';
module.exports = {
  name: 'Example Worker',
  interval: 5500,
  func: function() {
    console.log("Running example worker");
  }
}