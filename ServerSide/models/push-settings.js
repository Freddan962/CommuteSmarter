'use strict';
module.exports = (sequelize, DataTypes) => {
  var PushSettings = sequelize.define('PushSettings', {
    dbPushId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    category: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.STRING,
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
