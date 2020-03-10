const router = require("koa-router")({ prefix: "/api" });

const PictureController = require("./controllers/picture");
const UserController = require("./controllers/user");

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

  // picture
  router.get("/thumbList/:orderType?/:page?", PictureController.getThumbList);
  router.get("/pictureBox", PictureController.getPictureBox);
  router.get("/picture/:pid", PictureController.get);
  router.post("/picture/", PictureController.upload);
  router.delete("/picture/:pid", PictureController.delete);

  // tag
  router.get("/thumbList/:orderType?/:page?", PictureController.get);
  router.post("/pictureBox", PictureController.upload);
  router.delete("/picture/:pid", PictureController.delete);

  // score
  router.get("/thumbList/:orderType?/:page?", PictureController.get);
  router.post("/pictureBox", PictureController.upload);
  router.delete("/picture/:pid", PictureController.delete);

  // user
  router.post("/login", UserController.login);

  app.use(router.routes()).use(router.allowedMethods());
};
