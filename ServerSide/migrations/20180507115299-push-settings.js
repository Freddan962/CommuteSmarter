'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PushSettings', {
      dbPushId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      category: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING,
        unique: false
      },
      status: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PushSettings');
  }
};
