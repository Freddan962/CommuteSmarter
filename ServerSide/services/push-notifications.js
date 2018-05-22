const PushNotifications = require('node-pushnotifications');

const settings = {
    gcm: {
      id: '962564067117',
      phonegap: true
    }
};

const push = new PushNotifications(settings);

let pushMethods = {
  sendPushNotification: function(data, registrationIds) {
    const push = {
      title: data.title, // REQUIRED for Android
      body: data.body,
      custom: {
        sender: 'PVT73TrafficInfo',
      },
      priority: 'high', // gcm, apn. Supported values are 'high' or 'normal' (gcm). Will be translated to 10 and 5 for apn. Defaults to 'high'
      dryRun: false, // gcm for android
      icon: '', // gcm for android
      tag: '', // gcm for android
      color: '', // gcm for android
      clickAction: '', // gcm for android. In ios, category will be used if not supplied
    };

    // You can use it in node callback style
    push.send(registrationIds, push, (err, result) => {
        if (err) {
            console.log(err);
        } else {
    	    console.log(result);
        }
    });
  }
}

module.exports = pushMethods;
