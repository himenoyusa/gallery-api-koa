const router = require("koa-router")({ prefix: "/api" });
// const ScoreController = require(`${process.cwd()}/app/controllers/score`);
const UserController = require(`${process.cwd()}/app/controllers/user`);

router.post("/login", UserController.login);
router.post("/logout", UserController.logout);

// router.delete("/:sid", ScoreController.delete);

module.exports = router;
