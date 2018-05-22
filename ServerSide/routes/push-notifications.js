const pushMethods = require('../services/push-notifications.js');

module.exports = function(app, models) {
  /**
  * Route for adding a new push user to the database.
  * Requires the user to post a body containing the
  * push id.
  */
  app.post('/api/push', (request, result) => {
    
  });
}
