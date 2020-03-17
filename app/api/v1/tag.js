const router = require("koa-router")({ prefix: "/api" });
const TagController = require(`${process.cwd()}/app/controllers/picture`);

router.get("/thumbList/:orderType?/:page?", TagController.get);
router.post("/pictureBox", TagController.upload);
router.delete("/picture/:pid", TagController.delete);

module.exports = router;
