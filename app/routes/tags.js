const Router = require("koa-router");
const router = new Router({ prefix: "/tags" });
const jwt = require("koa-jwt");
const { find, create, findByTag, del } = require("../controllers/tags");

const secret = process.env.secret;

const auth = jwt({ secret });

router.get("/", find);
router.get("/:id", findByTag);
router.post("/", auth, create);
// router.patch("/:id", auth, update);
router.delete("/:id", auth, del);

module.exports = router;
