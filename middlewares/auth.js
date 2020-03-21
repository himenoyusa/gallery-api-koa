const { Forbidden } = require(`${process.cwd()}/core/http-exception`);

class Auth {
  constructor() {}

  get m() {
    return async (ctx, next) => {
      // TODO: token 检测
      const authorization = ctx.header.authorization || "";
      const token = authorization.split(" ");
      if (token[0] !== "Bearer" || token[1].length < 20) {
        throw new Forbidden("禁止访问");
      }
      await next();
    };
  }
}

module.exports = Auth;
