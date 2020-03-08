const Sequelize = require("sequelize");
const sequelize = require("./index");

const jwt = require("jsonwebtoken");
const jwtKoa = require("koa-jwt");
const util = require("util");
const bcrypt = require("bcrypt");
const verify = util.promisify(jwt.verify); // 解密
const secret = "yusa_kanata";

const PageSize = 9;
const BoxSize = 3;

var User = sequelize.define(
  "user",
  {
    u_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    create_time: Sequelize.INTEGER,
    edit_time: Sequelize.INTEGER,
    u_account: Sequelize.STRING,
    u_avatar: Sequelize.STRING,
    u_level: Sequelize.STRING,
    u_password: Sequelize.STRING,
    user_token: Sequelize.STRING
  },
  {
    timestamps: false
  }
);

module.exports = {
  login: async (username, password) => {
    var user = await User.findOne({
      where: {
        u_account: username
      }
    });
    if (user === null) {
      // 用户名错误
      return false;
    }
    // verify the password
    let flag = bcrypt.compareSync(password, user.u_password);
    if (!flag) {
      // 密码错误
      return false;
    }

    var userInfo = [user.u_id, user.u_account, user.u_avatar, user.u_level];
    var token = jwt.sign(
      {
        data: userInfo,
        exp: Math.floor(Date.now() / 1000) + 60 * 60
      },
      secret
    );
    // save the token
    (async () => {
      user.user_token = token;
      await user.save();
    })();

    userInfo.push(token);
    return userInfo;
  },
  checkUser: async () => {}
};
