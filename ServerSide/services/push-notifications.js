const PushNotifications = require('node-pushnotifications');

const settings = {
    gcm: {
      id: 962564067117
    }
};

const push = new PushNotifications(settings);
