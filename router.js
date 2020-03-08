const router = require("koa-router")({ prefix: "/api" });

const PictureController = require("./controllers/picture");
const UserController = require("./controllers/user");

module.exports = app => {
  router.all("/*", async (ctx, next) => {
    // *代表允许来自所有域名请求
    ctx.set("Access-Control-Allow-Origin", "*");
    // 其他一些设置...
    await next();
  });

  // picture
  router.get("/thumbList/:orderType?/:page?", PictureController.getThumbList);
  router.get("/pictureBox", PictureController.getPictureBox);
  router.get("/picture/:pid", PictureController.get);

  // tag

  // score

  // user
  router.post("/login", UserController.login);

  app.use(router.routes()).use(router.allowedMethods());
};
