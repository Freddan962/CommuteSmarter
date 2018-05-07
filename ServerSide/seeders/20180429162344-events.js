'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [
      {
        color: 'red',
        location: 'Torsgatan',
        lat: 54.566456,
        long: 56.77998,
        title:'Obstacle',
        reported: new Date(),
        description: 'car crash',
      },
      {
        color:'orange',
        location: 'Kungsgatan',
        lat: 54.566456,
        long: 56.77998,
        title:'closed for Marathon',
        reported: new Date(),
        description:'Marathon',
      },
      {
        color:'blue',
        location: 'Odengatan',
        lat: 54.566456,
        long: 56.77998,
        title:'emergency response vehicle',
        reported: new Date(), 
        description:'something',
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {});
  }
};
