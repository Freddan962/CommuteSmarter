'use strict';
module.exports = (sequelize, DataTypes) => {
  var PushSettings = sequelize.define('PushSettings', {
    userId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    category: {
      allowNull: false,
      type: DataTypes.STRING
    },
    status: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    }
  }, {
    timestamps: false
  });

  PushSettings.associate = function(models) {
  };

  return PushSettings;
};
