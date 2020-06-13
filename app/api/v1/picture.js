const router = require("koa-router")({ prefix: "/api" });
const PictureController = require(`${process.cwd()}/app/controllers/picture`);
const Auth = require(`${process.cwd()}/middlewares/auth`);

router.get("/thumbList/:orderType?/:page?", PictureController.getThumbList);
router.get(
  "/R18thumbList/:orderType?/:page?",
  new Auth().m,
  PictureController.getR18ThumbList
);
router.get("/pictureBox", PictureController.getPictureBox);
router.get("/picture", PictureController.get);
router.post("/picture", PictureController.upload);
router.delete("/picture/:pid", new Auth().m, PictureController.delete);

module.exports = router;
