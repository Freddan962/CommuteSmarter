'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Twitters', {
      userId: {
        type: Sequelize.STRING(18),
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      userToken: {
        allowNull: true,
        type: Sequelize.STRING
      },
      lastLogin: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Twitters');
  }
};
