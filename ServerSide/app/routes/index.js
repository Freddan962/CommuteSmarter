const twitterAccounts = require('./twitter_accounts');

module.exports = function(app, db) {
  twitterAccounts(app, db);
};
