'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      color: {
        allowNull: false,
        type: Sequelize.STRING
      },
      location: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lat: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      long: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      lat_end: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      long_end: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      category: {
        type: Sequelize.STRING
      },
      reported: {
        allowNull: false,
        type: Sequelize.DATE
      },
      description:{
        allowNull: true,
        type: Sequelize.STRING
      },
      imageString: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      solvedCount: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 0
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Events');
  }
};
