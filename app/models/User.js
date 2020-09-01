const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const maria = require("./index");

module.exports = maria.define("users", {
  uid: { type: DataTypes.INTEGER, primaryKey: true },
  name: { type: DataTypes.STRING, validate: { len: [2, 50] } },
  email: { type: DataTypes.STRING, validate: { isEmail: true } },
  password: {
    type: DataTypes.STRING,
    validate: { len: [2, 50] },
    set(value) {
      this.setDataValue("password", async () => await bcrypt.hash(value, 10));
    },
  },
  level: { type: DataTypes.STRING, isIn: [["guest", "admin", "vip"]] },
  verified: { type: DataTypes.BOOLEAN },
  avatar_url: { type: DataTypes.STRING },
  gender: { type: DataTypes.STRING, isIn: [["男", "女", "未知"]] },
  headline: { type: DataTypes.STRING },
  age: { type: DataTypes.INTEGER, validate: { max: 1000, min: 0 } },
});
