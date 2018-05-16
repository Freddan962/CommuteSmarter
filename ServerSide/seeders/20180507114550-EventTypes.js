'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('EventTypes', [
      {
        color: 'red',
        type: 'roadClosed',
        subtype: 'obstacle'
      },
      {
        color: 'red',
        type: 'roadClosed',
        subtype: 'closedForEvent'
      },
      {
        color: 'red',
        type: 'roadClosed',
        subtype: 'roadWork'
      },
      {
        color: 'red',
        type: 'roadClosed',
        subtype: 'otherClosed'
      },
      {
        color: 'orange',
        type: 'limitedPassability',
        subtype: 'obstacle'
      },
      {
        color: 'orange',
        type: 'limitedPassability',
        subtype: 'trafficJam'
      },
      {
        color: 'orange',
        type: 'limitedPassability',
        subtype: 'roadWork'
      },
      {
        color: 'orange',
        type: 'limitedPassability',
        subtype: 'otherPassability'
      },
      {
        color: 'blue',
        type: 'emergencyVehicles',
        subtype: 'emergencyVehicle'
      },
      {
        color: 'blue',
        type: 'emergencyVehicles',
        subtype: 'policeControl'
      },
      {
        color: 'blue',
        type: 'emergencyVehicles',
        subtype: 'otherEmergency'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('EventTypes', null, {});
  }
};
