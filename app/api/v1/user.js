const router = require("koa-router")({ prefix: "/api" });
const UserController = require(`${process.cwd()}/controllers/picture`);

// router.post("/login", UserController.login);

module.exports = router;
