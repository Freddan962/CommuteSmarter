'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('EventTypes', [
      {
        color: 'red',
        type: 'Road Closed',
        subtype: 'Obstacle on the road'
      },
      {
        color: 'red',
        type: 'Road Closed',
        subtype: 'Closed for event'
      },
      {
        color: 'red',
        type: 'Road Closed',
        subtype: 'Road work'
      },
      {
        color: 'red',
        type: 'Road Closed',
        subtype: 'Other'
      },
      {
        color: 'orange',
        type: 'Limited passability',
        subtype: 'Obstacle on the road'
      },
      {
        color: 'orange',
        type: 'Limited passability',
        subtype: 'Traffic jam'
      },
      {
        color: 'orange',
        type: 'Limited passability',
        subtype: 'Road work'
      },
      {
        color: 'orange',
        type: 'Limited passability',
        subtype: 'Other'
      },
      {
        color: 'blue',
        type: 'Emergency Vehicles',
        subtype: 'Emergency vehicle passing'
      },
      {
        color: 'blue',
        type: 'Emergency Vehicles',
        subtype: 'Police control'
      },
      {
        color: 'blue',
        type: 'Emergency Vehicles',
        subtype: 'Other'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('EventTypes', null, {});
  }
};
