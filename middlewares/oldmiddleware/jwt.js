const jwt = require("jsonwebtoken");
const jwtKoa = require("koa-jwt");
const util = require("util");
const verify = util.promisify(jwt.verify); // 解密
const secret = "yusa_kanata";

module.exports = app => {
  app.use((ctx, next) => {
    return next().catch(err => {
      if (401 === err.status) {
        ctx.body = { status: false, message: "permission deny" };
      } else {
        throw err;
      }
    });
  });

  app.use(async (ctx, next) => {
    if (ctx.header && ctx.header.authorization) {
      const parts = ctx.header.authorization.split(" ");
      if (parts.length === 2) {
        //取出token
        const scheme = parts[0];
        const token = parts[1];
        if (/^Bearer$/i.test(scheme)) {
          try {
            //jwt.verify方法验证token是否有效
            jwt.verify(token, secret.sign, {
              complete: true
            });
          } catch (error) {
            //token过期 生成新的token
            const newToken = getToken(user);
            //将新token放入Authorization中返回给前端
            ctx.res.setHeader("Authorization", newToken);
          }
        }
      }
    }
  });

  // TODO： jwt 验证功能待完善
  app.use(
    jwtKoa({ secret }).unless({
      path: [/^\/api\/thumbList/, /^\/api\/pictureBox/, /^\/api\/login/]
    })
  );
};
