const router = require("koa-router")({ prefix: "/api/token" });
// const ScoreController = require(`${process.cwd()}/app/controllers/score`);
const UserController = require(`${process.cwd()}/app/controllers/user`);

router.post("/", UserController.login);

// router.delete("/:sid", ScoreController.delete);

module.exports = router;
