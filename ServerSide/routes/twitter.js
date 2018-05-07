module.exports = function(app, models) {

  /**
  * Route for adding a new twitter user to the database.
  * Requires the user to post a body containing the key/value
  * pairs: userId. userToken.
  */
  app.post('/api/twitter/user', (request, result) => {
    console.log(request.body);

    let body = request.body;

    let response = {
      status: 200
    };

    // Both of the required paramters with user details were successfully
    // recived if the response code still is set to 200.
    if(checkUserDetails(body, response)) {
      let date = new Date();
      let user = {
        userId: body.userId,
        userToken: body.userToken,
        lastLogin: date,
        createdAt: date
      }

      //add to database
      models.Twitter.create(user)
      .then(user => {
        console.log(user);
        response['messages'] = ["Added the user successfully!"];
        response['amountMessages'] = 1;
        result.json(response);
      })
      .catch(err => {
        result.status(400);
        result.json(err);
      });
    }
  });

  /**
  * For turing on or off user access.
  */
  app.put('/api/twitter/user/access', (request, result) => {
    console.log(request.body);

    let body = request.body;

    let response = {
      status: 200
    };

    result.json(response);
  });

  /**
  * For getting user access status.
  */
  app.get('/api/twitter/user/access', (request, result) => {
    console.log(request.body);

    let body = request.body;

    let response = {
      status: 200
    };

    result.json(response);
  });
}

function checkUserDetails(body, response) {
  if(userIdIsMissing(body)) {
    pushAnError(response, "The userId seems to be missing!");
  }

  if(!userIdIsMissing(body) && body.userId.length <= 0) {
    pushAnError(response, "The userId seems to be way to short!");
  }

  if(userTokenIsMissing(body)) {
    pushAnError(response, "The userToken seems to be missing!");
  }

  if(!userTokenIsMissing(body) && body.userToken.length <= 0) {
    pushAnError(response, "The userToken seems to be way to short!");
  }

  return response.status === 200;
}

function userIdIsMissing(body) {
  return body.userId === undefined || body.userId === null;
}

function userTokenIsMissing(body) {
  return body.userToken === undefined || body.userToken === null;
}

function createErrorObject(response) {
  response['status'] = 400;
  response['messages'] = [];
  response['amountMessages'] = 0;
}

function pushAnError(object, error) {
  if(object.amountMessages === undefined) {
    createErrorObject(object);
  }
  object.messages.push(error);
  ++object.amountMessages;
}

/**
* Used to get a user by userId.
*/
let getTwitterUser = function(userId, models, callback) {
  models.Twitter.findOne({ where: { userId: userId } }).then(user => {
      callback(user);
  });
}

module.exports.getTwitterUser = getTwitterUser;
