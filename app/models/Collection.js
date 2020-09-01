const { DataTypes } = require("sequelize");
const maria = require("./index");

module.exports = maria.define("collections", {
  collection_id: { type: DataTypes.INTEGER, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, validate: { isInt: true } },
  picture_id: { type: DataTypes.INTEGER, validate: { isInt: true } },
});
