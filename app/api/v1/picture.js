const router = require("koa-router")({ prefix: "/api" });
const PictureController = require(`${process.cwd()}/app/controllers/picture`);

router.get(
  "/thumbList/:orderType?/:page?/:r18?",
  PictureController.getThumbList
);
router.get("/pictureBox", PictureController.getPictureBox);
router.get("/picture/:pid", PictureController.get);
router.post("/picture/", PictureController.upload);
router.delete("/picture/:pid", PictureController.delete);

module.exports = router;
