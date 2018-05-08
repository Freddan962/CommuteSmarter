'use strict';
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define('Event', {
    color: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [['red', 'orange', 'blue']],
          msg: 'Invalid color'
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
    },
    lat: {
      type: DataTypes.FLOAT,
      validate: {
        min: {
          args: [-90],
          msg: "Latitude value can't be less than -90",
        },
        max: {
          args: [90],
          msg: "Latitude value can't be greather than 90",
        }
      }
    },
    long: {
      type: DataTypes.FLOAT,
      validate: {
        min: {
          args: [-180],
          msg: "Longitude value can't be less than -180",
        },
        max: {
          args: [180],
          msg: "Longitude value can't be greather than 180",
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
    },
    reported: {
      type: DataTypes.DATE,
      allowNull: false,
      notEmpty: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      notEmpty: true
    }
}, {
  timestamps: false
});

  Event.associate = function(models) {
  };

  return Event;
};
