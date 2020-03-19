const router = require("koa-router")({ prefix: "/api/token" });
// const ScoreController = require(`${process.cwd()}/app/controllers/score`);
const { TokenValidator } = require(`${process.cwd()}/app/validators/validator`);

router.post("/", async ctx => {
  const v = await new TokenValidator().validate(ctx);
});

// router.delete("/:sid", ScoreController.delete);

module.exports = router;
