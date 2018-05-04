module.exports = function(app, models) {

  /**
  * Route for adding a new twitter user to the database.
  * Requires the user to post a body containing the key/value
  * pairs: userId. userToken.
  */
  app.post('/api/twitter', (request, result) => {
    console.log(request.body);

    let body = request.body;

    let response = {
      status: 200
    };

    checkUserDetails(body, response);

    // if the response code still is set to 200 both of the required
    // paramters with user details were successfully recived and the
    // user did not already exist.
    if(response.status === 200) {
      let user = {
        userId: body.userId,
        userToken: body.userToken,
        lastLogin: 'Best way to get Current Time'
      }

      //add to database
      models.Twitter.create(user).then(user => {
        console.log(user);
        response['messages'] = ["Added the user successfully!"];
        response['amountMessages'] = 1;
      });
    }

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
