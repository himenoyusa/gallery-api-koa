const { DataTypes } = require("sequelize");
const maria = require("./index");

module.exports = maria.define("tags", {
  tag_id: { type: DataTypes.INTEGER, primaryKey: true },
  created_by: { type: DataTypes.INTEGER, validate: { isInt: true } },
  picture_id: { type: DataTypes.INTEGER, validate: { isInt: true } },
  tag: { type: DataTypes.STRING },
  tag_avatar_url: { type: DataTypes.STRING },
});
