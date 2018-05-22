'use strict';
module.exports = (sequelize, DataTypes) => {
  var PushSettings = sequelize.define('PushSettings', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
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
