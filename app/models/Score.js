const { DataTypes } = require("sequelize");
const maria = require("./index");

module.exports = maria.define("scores", {
  score_id: { type: DataTypes.INTEGER, primaryKey: true },
  picture_id: { type: DataTypes.INTEGER, validate: { isInt: true } },
  created_by: { type: DataTypes.INTEGER, validate: { isInt: true } },
  score: { type: DataTypes.INTEGER, validate: { max: 100, min: 0 } },
});
