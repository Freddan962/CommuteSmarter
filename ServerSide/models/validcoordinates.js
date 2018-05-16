'use strict';
module.exports = (sequelize, DataTypes) => {
  var ValidCoordinates = sequelize.define('ValidCoordinates', {

    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    latitude_end: DataTypes.FLOAT,
    longitude_end: DataTypes.FLOAT
  }, { timestamps: false } );

  ValidCoordinates.associate = function(models) {
    // associations can be defined here
  };
  return ValidCoordinates;
};
