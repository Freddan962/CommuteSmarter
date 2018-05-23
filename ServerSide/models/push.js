'use strict';
module.exports = (sequelize, DataTypes) => {
  var PushUsers = sequelize.define('PushUsers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });

  PushUsers.associate = function(models) {
  };

  return PushUsers;
};
