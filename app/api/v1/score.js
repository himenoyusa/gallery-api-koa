const router = require("koa-router")({ prefix: "/api/score" });
const ScoreController = require(`${process.cwd()}/app/controllers/score`);

router.get("/:sid", ScoreController.get);
router.post("/", ScoreController.upload);
router.delete("/:sid", ScoreController.delete);

module.exports = router;
