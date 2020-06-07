const router = require("koa-router")({ prefix: "/api/score" });
const ScoreController = require(`${process.cwd()}/app/controllers/score`);
const Auth = require(`${process.cwd()}/middlewares/auth`);

router.get("/:pid", ScoreController.getOnePictureScore);
router.post("/", ScoreController.upload);
router.delete("/:sid", new Auth().m, ScoreController.delete);

module.exports = router;
