/** routes/index.js
 *
 * In this file we require the files for each of the
 * routes and export them in module.exports. With other
 * words, we use this as an Index-file.
 * Each file gets access to the app and database
 * trough the parameters: app and modules.
 */
const twitterAccounts = require('./twitter');
const events = require('./events');

module.exports = function(app, modules) {
  twitterAccounts(app, modules);
  events(app, modules);
};
