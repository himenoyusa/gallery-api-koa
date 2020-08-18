const Router = require("koa-router");
const router = new Router({ prefix: "/api/pictures/:id/comments" });
const jwt = require("koa-jwt");
const { find, create } = require("../controllers/comments");
const { checkPicExists } = require("../controllers/pictures");

const secret = process.env.secret;

const auth = jwt({ secret });

router.get("/", find);
router.post("/", auth, checkPicExists, create);

module.exports = router;
