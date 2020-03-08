const UserModel = require("../models/User");

module.exports = {
  login: async ctx => {
    var username = ctx.request.body.username || "";
    var password = ctx.request.body.password || "";
    var user = await UserModel.login(username, password);
    if (!user) {
      ctx.body = {
        status: false,
        message: "信息错误，登录失败"
      };
    } else {
      ctx.status = 401;
      ctx.body = {
        data: user,
        status: true
      };
    }
  },
  checkUser: async ctx => {}
};
