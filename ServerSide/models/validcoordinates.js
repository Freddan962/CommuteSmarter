'use strict';
module.exports = (sequelize, DataTypes) => {
  var ValidCoordinates = sequelize.define('ValidCoordinates', {
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE
  }, {});
  ValidCoordinates.associate = function(models) {
    // associations can be defined here
  };
  return ValidCoordinates;
};