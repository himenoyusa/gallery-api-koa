const router = require("koa-router")({ prefix: "/api" });
const UserController = require(`${process.cwd()}/app/controllers/user`);

// router.post("/login", UserController.login);
router.post("/register", UserController.register);

module.exports = router;
