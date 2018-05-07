module.exports = function(app, models) {
  /**
  * Route for adding a new twitter user to the database.
  * Requires the user to post a body containing the key/value
  * pairs: userId. userToken.
  */
  app.post('/api/twitter/access', (request, result) => {
    console.log(request.body);

    let body = request.body;

    let response = {
      status: 200
    };

    // Both of the required paramters with user details were successfully
    // recived if the response code still is set to 200.
    if(checkUserDetails(body, response)) {
      models.Twitter.find({ where: { userId: body.userId } }).then( user => {
        if(user) {
          user.updateAttributes({
            token: body.token
          }).then( () => {
            response['access'] = true;
            response['messages'] = ["User successfully signed in!"];
            response['amountMessages'] = 1;
            result.json(response);
          });
        } else {
          //add to database
          let date = new Date();
          let newUser = {
            userId: body.userId,
            userToken: body.userToken,
            lastLogin: date,
            createdAt: date
          }

          models.Twitter.create(newUser).then(user => {
            response['access'] = true;
            response['messages'] = ["Added the user successfully!"];
            response['amountMessages'] = 1;
            result.json(response);
          }).catch(err => {
            result.status(400);
            result.json(err);
          });
        }
      })
    } else {
      result.status(400);
      result.json(response);
    }
  });

  /**
  * For turning off user access. Requires user to post
  * body with userId.
  */
  app.post('/api/twitter/logout', (request, result) => {
    console.log(request.body);

    let body = request.body;

    let response = {
      status: 200
    };

    if(checkUserDetails(body, response)) {
      models.Twitter.find({ where: { userId: body.userId } }).then( user => {
        if(user && user.userToken !== null) {
          user.updateAttributes({
            userToken: null
          }).then( updated => {
            response['access'] = false;
            response['messages'] = ["User successfully signed out!"];
            response['amountMessages'] = 1;
            result.json(response);
          });
        } else if(user !== undefined && user.userToken === null) {
          response['access'] = false;
          response['messages'] = ["User already signed out!"];
          response['amountMessages'] = 1;
          result.json(response);
        } else {
          result.status(400);
          pushAnError(response, "The user did not exist!");
          result.json(response);
        }
      })
    } else {
      result.json(response);
    }
  });
}

function checkIfStausOk(response) {
  return response.status === 200;
}

function checkUserDetails(body, response) {
  userIdCheck(body, response);
  userTokenCheck(body, response);

  return checkIfStausOk(response);
}

function userIdCheck(body, response) {
  if(userIdIsMissing(body)) {
    pushAnError(response, "The userId seems to be missing!");
  }

  if(!userIdIsMissing(body) && body.userId.length <= 0) {
    pushAnError(response, "The userId seems to be way to short!");
  }
}

function userTokenCheck(body, response) {
  if(userTokenIsMissing(body)) {
    pushAnError(response, "The userToken seems to be missing!");
  }

  if(!userTokenIsMissing(body) && body.userToken.length <= 0) {
    pushAnError(response, "The userToken seems to be way to short!");
  }
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

/**
 * Used to get if a user is logged in.
 */
let getIfLoggedIn = function(userId, models, callback) {
  models.Twitter.findOne({ where: { userId: userId } }).then(user => {
      callback(user.token !== null);
  });
}

module.exports.getTwitterUser = getTwitterUser;
module.exports.getIfLoggedIn = getIfLoggedIn;
