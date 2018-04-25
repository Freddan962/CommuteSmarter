const twitterAccounts = require('./twitter_accounts');
const events = require('./events');

module.exports = function(app, db) {
  twitterAccounts(app, db);
  events(app, db);
};
