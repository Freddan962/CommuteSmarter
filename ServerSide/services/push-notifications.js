const PushNotifications = require('node-pushnotifications');

const settings = {
    gcm: {
      //It took way too long to figure out that this key is the FCM Server API_KEY and not the FCM project id.
      id: 'AAAA4B1KDy0:APA91bGKIaWHL0bD9LxRyU3pnzs6d3E-9AOWgdpTCPb1ZkOhijK5RqUx8-YswJ8W5vrYIyY_C31K7cHG9vYjZ-E-j5nF4R1Jn_4RZDU1Fs2wRDiDLkYXdGtHVoUPztoj4BZNpIUHeGWJ',
      phonegap: true
    }
};

const push = new PushNotifications(settings);

let pushMethods = {
  sendPushNotification: function(data, registrationIds, perform) {
    const message = {
      title: data.title, // REQUIRED for Android
      body: data.body,
      custom: {
        sender: 'PVT73TrafficInfo',
      },
      priority: 'high', // gcm, apn. Supported values are 'high' or 'normal' (gcm). Will be translated to 10 and 5 for apn. Defaults to 'high'
      dryRun: false, // gcm for android
      icon: data.icon, // gcm for android
      tag: '', // gcm for android
      color: data.color, // gcm for android
    };

    // You can use it in node callback style
    push.send(registrationIds, message, (err, result) => {
        if (err) {
            console.log(err);
            perform(err);
        } else {
    	    console.log(result);
          perform(result);
        }
    });
  }
}

module.exports = pushMethods;
