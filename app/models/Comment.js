const { DataTypes } = require("sequelize");
const maria = require("./index");

module.exports = maria.define("comments", {
  comment_id: { type: DataTypes.INTEGER, primaryKey: true },
  picture_id: { type: DataTypes.INTEGER, validate: { isInt: true } },
  user_id: { type: DataTypes.INTEGER, validate: { isInt: true } },
  comment: { type: DataTypes.STRING },
});
