const models = require('../models');
const express = require('express');
const router = express.Router();

router.post('/api/twitter', (request, result) => {
  console.log(request.body);

  let body = request.body;

  let response = {
    status: 200
  };

  checkUserDetails(body, response);

  // if the response code is stiil set to 200 the user details were recived.
  if(response.status === 200) {
    let user = {
      userId: body.userId,
      userToken: body.userToken,
      lastLogin: 'Best way to get Current Time'
    }

    //add to database
    models.Twitter.create(user).then(event => {
      response['messages'] = ["Added the user successfully!"];
      response['amountMessages'] = 1;
    });
  }

  result.json(response);
});

module.exports = router;

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
