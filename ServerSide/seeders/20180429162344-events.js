'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [
      {
        color: 'red',
        location: 'Torsgatan',
        lat: 54.566456,
        long: 56.77998,
        lat_end: -100,
        long_end: -100,
        category:'obstacle',
        reported:'2018-04-27 09:30',
        description: 'car crash',
      },
      {
        color:'orange',
        location: 'Kungsgatan',
        lat: 54.566456,
        long: 56.77998,
        lat_end: -100,
        long_end: -100,
        category:'trafficJam',
        reported:'2018-04-27 11:30', 
        description:'Marathon',
      },
      {
        color:'blue',
        location: 'Odengatan',
        lat: 54.566456,
        long: 56.77998,
        lat_end: -100,
        long_end: -100,
        category:'policeControl', 
        reported:'2018-04-27 14:30', 
        description:'something',
      },
      {
        color: 'orange',
        location: 'Borgarfjordsgatan',
        lat: 59.4075479,
        long: 17.9485146,
        lat_end: 59.4075479,
        long_end: 17.9485146,
        category: 'trafficJam',
        reported: '2018-04-27 16:30',
        description: 'Heavy traffic...'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {});
  }
};
