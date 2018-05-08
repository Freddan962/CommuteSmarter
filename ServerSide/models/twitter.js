'use strict';

module.exports = (sequelize, DataTypes) => {
  var Twitter = sequelize.define('Twitter', {
    userId: { type: DataTypes.STRING, unique: true, primaryKey: true },
    userToken: { type: DataTypes.STRING, allowNull: true },
    lastLogin:  { type: DataTypes.DATE, allowNull: false },
    createdAt:  { type: DataTypes.DATE, allowNull: false},
  }, { timestamps: false });

  Twitter.associate = function(models) {};

  return Twitter;
};
