const router = require("koa-router")({ prefix: "/api" });

module.exports = app => {
  router.all("/*", async (ctx, next) => {
    // *代表允许来自所有域名请求
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set("Access-Control-Allow-Credentials", "true");
    ctx.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, x-requested-with"
    );
    // 其他一些设置...
    await next();
  });

  app.use(router.routes()).use(router.allowedMethods());
};
