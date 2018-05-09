'use strict';

var fs        = require('fs');
var path      = require('path');
var basename  = path.basename(__filename);
var workers       = {};

/*
  To create a worker simply add a JS file to the workers directory,
  with the following exported content:

  module.exports = {
    name: 'Example Worker',
    interval: 1500,
    func: function() {
      console.log("Example worker");
    }
  }

  Name = The name of the worker, used for load logging.
  Interval = The interval of which the worker should be executed.
  Func = The function to be executed.
*/

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var worker = require(path.join(__dirname, file));
    workers[worker.name] = worker;
  });

Object.keys(workers).forEach(workerName => {
  setInterval(workers[workerName].func, workers[workerName].interval);
  console.log("Starting worker: " + workerName + " - " + workers[workerName].interval);
});

module.exports = workers;
