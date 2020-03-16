const router = require("koa-router")({ prefix: "/api" });
const ScoreController = require(`${process.cwd()}/controllers/score`);

router.get("/thumbList/:orderType?/:page?", ScoreController.get);
router.post("/pictureBox", ScoreController.upload);
router.delete("/picture/:pid", ScoreController.delete);

module.exports = router;
