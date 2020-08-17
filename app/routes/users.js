const Router = require("koa-router");
const router = new Router({ prefix: "/users" });
const jwt = require("koa-jwt");
const {
  find,
  findById,
  create,
  update,
  del,
  login,
  checkOwner,
} = require("../controllers/users");

const secret = process.env.secret;

const auth = jwt({ secret });

router.get("/", auth, checkOwner, find);
router.get("/:id", findById);
router.post("/", create);
router.patch("/:id", auth, checkOwner, update);
router.delete("/:id", auth, checkOwner, del);
router.post("/login", login);

module.exports = router;
