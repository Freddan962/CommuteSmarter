'use strict';

module.exports = (sequelize, DataTypes) => {
  var Twitter = sequelize.define('Twitter', {
    userId: { type: DataTypes.STRING, unique: true, primaryKey: true },
    userToken: DataTypes.STRING,
    lastLogin: DataTypes.DATE
  }, {});

  Twitter.associate = function(models) {};

  return Twitter;
};
