'use strict';

module.exports = (sequelize, DataTypes) => {
  var EventTypes = sequelize.define('EventTypes', {
    color: DataTypes.STRING,
    type: DataTypes.STRING,
    subtype: DataTypes.STRING
  }, {});
  EventTypes.associate = function(models) {
    // associations can be defined here
  };
  return EventTypes;
};