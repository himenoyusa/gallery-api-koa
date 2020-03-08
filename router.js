const router = require("koa-router")({ prefix: "/api" });
const PictureController = require("./controllers/picture");

module.exports = app => {
  router.all("/*", async (ctx, next) => {
    // *代表允许来自所有域名请求
    ctx.set("Access-Control-Allow-Origin", "*");
    // 其他一些设置...
    await next();
  });

  router.get("/", async (ctx, next) => {
    ctx.body = `<h1>404</h1>`;
  });

  // picture
  router.get("/picture/:pid", PictureController.get);

  app.use(router.routes()).use(router.allowedMethods());
};
