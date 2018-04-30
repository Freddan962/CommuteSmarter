'use strict';

module.exports = (sequelize, DataTypes) => {
  var Twitter = sequelize.define('Twitter', {
    userId: DataTypes.STRING,
    userToken: DataTypes.STRING,
    lastLogin: DataTypes.STRING
  }, {});

  Twitter.associate = function(models) {};

  return Twitter;
};
