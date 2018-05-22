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

  /**
   * Route for setting if an event category should send notifications.
   */
  app.post('/api/push/user/category/', (request, result) => {
    let userId = request.body.userId;
    let category = request.body.category;
    let status = request.body.status;

    console.log(userId);
    console.log(category);
    console.log(status);

    models.PushUsers.findOne({ where: { userId: userId } }).then(userExists => {
      if(userExists) {
        models.PushSettings.findOne({ where:{ userId: userId, category: category }}).then(categoryExists => {
          if(categoryExists) {
            PushSettings.updateAttributes({
              status: status
            }).then(() => {
              result.status(200).json({status: 200, message: 'Successfully changed status!'});
            })
          } else {
            models.PushSettings.create({ userId: userId, category: category, status: status }).then(categoryExists => {
              if(categoryExists) {
                result.status(200).json({status: 200, message: 'Successfully changed status!'});
              } else {
                result.status(400).json({status: 400, message: 'Did not change status!'});
              }
            });
          }
        });
      } else {
        result.status(403).json({status: 403, message: 'Not a valid user!'});
      }
    });
  });

  app.get('/api/push/send/:badPassJustForTest/:id', (request, result) => {
    let pass = request.params.badPassJustForTest;
    let id = request.params.id;

    console.log(pass);
    console.log(id);

    if(pass === 'juxandepåstörrenivåer') {
      pushMethods.sendPushNotification({title: 'En push', body: 'Texten i pushen'}, id, (response) => {
        result.status(200).json(response);
      });
    }
  });
}
