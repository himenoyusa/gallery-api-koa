const Sequelize = require("sequelize");
const sequelize = require("./index");

const jwt = require("jsonwebtoken");
// const jwtKoa = require("koa-jwt");
const bcrypt = require("bcrypt");

// 初始化模型
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
  login: async (username, password, remember) => {
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

    var tokenInfo = [user.u_id, user.u_account, user.u_avatar, user.u_level];
    if (remember) {
      // 设置登录失效时间为一个月
      var exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30;
    } else {
      // 设置登录失效时间为一天
      var exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
    }
    var token = jwt.sign(
      {
        data: tokenInfo,
        exp
      },
      global.config.secretKey
    );
    // save the token
    (async () => {
      user.user_token = token;
      await user.save();
    })();

    userInfo = {
      userID: user.u_id,
      account: user.u_account,
      userLevel: user.u_level,
      avatar: user.u_avatar,
      token
    };
    return userInfo;
  },

  // TODO: 用户登出
  logout: async () => {},
  // TODO: 验证 api 访问权限
  checkToken: async token => {
    var user = await User.findOne({
      where: {
        user_token: token
      }
    });
  }
};
