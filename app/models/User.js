const { DataTypes } = require("sequelize");
const maria = require("./index");

module.exports = maria.define("users", {
  uid: { type: DataTypes.INTEGER, primaryKey: true },
  name: { type: DataTypes.STRING, validate: { len: [2, 50] } },
  email: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  level: { type: DataTypes.STRING, isIn: [["guest", "admin", "vip"]] },
  verified: { type: DataTypes.BOOLEAN },
  avatar_url: { type: DataTypes.STRING },
  gender: { type: DataTypes.STRING },
  headline: { type: DataTypes.STRING },
  age: { type: DataTypes.INTEGER, validate: { max: 1000, min: 0 } },
});
