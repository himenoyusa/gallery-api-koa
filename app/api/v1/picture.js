const router = require("koa-router")({ prefix: "/api" });
const PictureController = require(`${process.cwd()}/app/controllers/picture`);
const Auth = require(`${process.cwd()}/middlewares/auth`);

router.get(
  "/thumbList/:orderType?/:page?/:r18?",
  new Auth().m,
  PictureController.getThumbList
);
router.get("/pictureBox", PictureController.getPictureBox);
router.get("/picture/:pid", PictureController.get);
router.post("/picture/", new Auth().m, PictureController.upload);
router.delete("/picture/:pid", new Auth().m, PictureController.delete);

module.exports = router;
