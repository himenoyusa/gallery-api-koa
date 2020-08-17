const Router = require("koa-router");
const router = new Router({ prefix: "/users" });
const jwt = require("koa-jwt");
const {
  checkOwner,
  checkUserExist,
  find,
  findById,
  create,
  update,
  del,
  login,
  listFollowing,
  listFollowers,
  follow,
  unfollow,
} = require("../controllers/users");

const secret = process.env.secret;

const auth = jwt({ secret });

router.get("/", auth, checkOwner, find);
router.get("/:id", findById);
router.post("/", create);
router.patch("/:id", auth, checkOwner, update);
router.delete("/:id", auth, checkOwner, del);
router.post("/login", login);

router.get("/:id/following", listFollowing);
router.get("/:id/followers", listFollowers);
router.put("/following/:id", auth, checkUserExist, follow);
router.delete("/following/:id", auth, checkUserExist, unfollow);

module.exports = router;
