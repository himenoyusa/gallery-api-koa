const UserModel = require(`${process.cwd()}/app/models/User`);

const {
  LoginValidator,
  RegisterValidator
} = require(`${process.cwd()}/app/validators/validator`);
const {
  Response,
  ParameterException
} = require(`${process.cwd()}/core/http-exception`);

module.exports = {
  // 登录，成功时返回 token
  login: async ctx => {
    const v = await new LoginValidator().validate(ctx);
    const account = v.get("body.account");
    const secret = v.get("body.secret");
    const remember = v.get("body.remember") || false;
    var user = await UserModel.login(account, secret, remember);
    if (!user) {
      throw new ParameterException("账号或密码错误");
    } else {
      throw new Response(user); // 将 user 信息返回客户端
    }
  },
  logout: async ctx => {},
  register: async ctx => {
    const v = new RegisterValidator().validate(ctx);
    ctx.body = v;
  }
};
