const UserModel = require(`${process.cwd()}/app/models/User`);

const {
  TokenValidator,
  RegisterValidator
} = require(`${process.cwd()}/app/validators/validator`);
const {
  Success,
  ParameterException
} = require(`${process.cwd()}/core/http-exception`);

module.exports = {
  login: async ctx => {
    const v = await new TokenValidator().validate(ctx);
    var user = await UserModel.login(v.account, v.secret);
    if (!user) {
      throw new ParameterException("账号或密码错误");
    } else {
      throw new Success("登录成功");
    }
  },
  checkUser: async ctx => {},
  register: async ctx => {
    const v = new RegisterValidator().validate(ctx);
    ctx.body = v;
  }
};
