const { DataTypes } = require("sequelize");
const maria = require("./index");

module.exports = maria.define("pictures", {
  picture_id: { type: DataTypes.INTEGER, primaryKey: true },
  created_by: { type: DataTypes.INTEGER, validate: { isInt: true } },
  updated_by: { type: DataTypes.INTEGER, validate: { isInt: true } },
  picture_url: { type: DataTypes.STRING },
  thumb_url: { type: DataTypes.STRING },
  collection_count: { type: DataTypes.INTEGER },
  score: { type: DataTypes.INTEGER },
});
