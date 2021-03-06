/**
 * The main application file in which express is
 * instansiated.
 */
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
cors = require('cors'); //Needed for post-requests to server to work

const app = express();

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/static', express.static('public'))

const models = require('./models');
const workers = require('./workers');
const coordinatesService = require('./services/get-coordinates');
coordinatesService.populateCoordsTable(models, 44);

require('./routes')(app, models);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(500).json({
    message: err.message,
    error: err
  });
});

module.exports = app;
