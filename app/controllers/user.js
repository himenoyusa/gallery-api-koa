const UserModel = require("../models/User");
const {
  RegisterValidator
} = require(`${process.cwd()}/app/validators/validator`);

module.exports = {
  login: async ctx => {
    var { username } = ctx.request.body.params || "";
    var { password } = ctx.request.body.params || "";
    var user = await UserModel.login(username, password);
    if (!user) {
      ctx.status = 401;
      ctx.body = {
        status: false,
        message: "信息错误，登录失败"
      };
    } else {
      ctx.body = {
        data: user,
        status: true
      };
    }
  },
  checkUser: async ctx => {},
  register: async ctx => {
    const v = new RegisterValidator().validate(ctx);
    ctx.body = v;
  }
};
