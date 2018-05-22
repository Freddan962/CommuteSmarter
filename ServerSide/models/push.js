'use strict';
module.exports = (sequelize, DataTypes) => {
  var PushUsers = sequelize.define('PushUsers', {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }
  }, {
    timestamps: false
  });

  PushUsers.associate = function(models) {
  };

  return PushUsers;
};
