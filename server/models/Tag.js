"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var Tag = sequelize.define("Tag", {
        name: {type: DataTypes.STRING},
        parentname: {type: DataTypes.STRING},
        parentid:{type: DataTypes.STRING},
      }
  );

  Tag.associate = function (models) {
    //Location.hasMany(models.Hotel, {as: 'locationhotels', foreignKey: 'location_id'});
    //Location.hasMany(models.Place, {as: 'places', foreignKey: 'location_id'});
  };

  return Tag;
};
