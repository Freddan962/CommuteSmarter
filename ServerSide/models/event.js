'use strict';
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define('Event', {
    color: DataTypes.STRING,
    location: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    long: DataTypes.FLOAT,
    title: DataTypes.STRING,
    reported: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Event.associate = function(models) {
  };
  return Event;
};