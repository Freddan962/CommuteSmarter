const twitterAccounts = require('./twitter');
const events = require('./events');

module.exports = function(app, modules) {
  twitterAccounts(app, modules);
  events(app, modules);
};
