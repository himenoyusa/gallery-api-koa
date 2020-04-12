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
  // 登录，成功时返回用户信息
  login: async ctx => {
    const v = await new LoginValidator().validate(ctx);
    const account = v.get("body.username");
    const secret = v.get("body.password");
    const remember = v.get("body.remember") || false;
    var user = await UserModel.login(account, secret, remember);
    if (!user) {
      throw new ParameterException("账号或密码错误");
    } else {
      throw new Response(user); // 将 user 信息返回客户端
    }
  },
  // TODO: 注销
  logout: async ctx => {},
  // TODO：注册
  register: async ctx => {
    const v = new RegisterValidator().validate(ctx);
    ctx.body = v;
  }
};
