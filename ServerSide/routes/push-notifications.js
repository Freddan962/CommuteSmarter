const pushMethods = require('../services/push-notifications.js');

module.exports = function(app, models) {
  /**
  * Route for adding a new push user to the database.
  * Requires the user to post a body containing the
  * push id.
  */
  app.post('/api/push/user', (request, result) => {
    let userId = request.body.userId;
    models.PushUsers.findOne({ where:{ userId: userId }}).then(userExists => {
      if(userExists) {
        result.status(200).json({status: 200, message: "The push user already exists"});
      } else {
        models.PushUsers.create({userId: request.body.userId}).then( pushUser => {
          if(pushUser) {
            result.status(200).json({status: 200, message: "Created the Push User Successfully"});
          } else {
            result.status(503).json({staus: 503, error: "Error occured on the server"});
          }
        }).catch((err) => {
          result.status(400).json({ staus: 400, error: err });
        });
      }
    });
  });

  app.get('/api/push/send/:badPassJustForTest/:id', (request, result) => {
    if(request.params.badPassJustForTest === 'juxandepåstörrenivåer') {
      pushMethods.sendPushNotification({title: 'En push', body: 'Texten i pushen'}, request.params.id);
    }
  });
}
