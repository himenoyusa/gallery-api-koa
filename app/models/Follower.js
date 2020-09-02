const { DataTypes } = require("sequelize");
const maria = require("./index");

module.exports = maria.define("followers", {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, validate: { isInt: true } },
  followed_id: { type: DataTypes.INTEGER, validate: { isInt: true } },
});
