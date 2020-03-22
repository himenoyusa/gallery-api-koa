const jwt = require("jsonwebtoken");
const { Forbidden, Response } = require(`${process.cwd()}/core/http-exception`);

class Auth {
  constructor() {}

  get m() {
    return async (ctx, next) => {
      // token 检测
      if (ctx.header && ctx.header.authorization) {
        const parts = ctx.header.authorization.split(" ");
        if (parts.length === 2) {
          //取出token
          const scheme = parts[0];
          const token = parts[1];
          if (/^Bearer$/i.test(scheme)) {
            //jwt.verify方法验证token是否有效
            try {
              const decoded = jwt.verify(token, global.config.secretKey);
              // TODO: 进一步验证身份
              // console.log(decoded);
            } catch (e) {
              throw new Forbidden("token无效");
            }
            await next();
          }
        }
      }
    };
  }
}

module.exports = Auth;
