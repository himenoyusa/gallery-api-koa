const Router = require("koa-router");
const router = new Router({ prefix: "/api/tags" });
const jwt = require("koa-jwt");
const { find, create, findPicsByTag } = require("../controllers/tags");
const { checkPicExists } = require("../controllers/pictures");

const secret = process.env.secret;

const auth = jwt({ secret });

router.get("/", find);
router.get("/:id", findPicsByTag);
router.post("/:id", auth, checkPicExists, create);
// router.delete("/:id", auth, del);

module.exports = router;
