const Router = require("koa-router");
const router = new Router({ prefix: "/api/pictures" });
const jwt = require("koa-jwt");
const {
  checkPicExists,
  find,
  limitFind,
  upload,
  findById,
  limitFindById,
  update,
  del,
  followPics,
  unfollowPics,
  listFollowPics,
} = require("../controllers/pictures");

const secret = process.env.secret;

const auth = jwt({ secret });

router.get("/", find);
router.get("/limit", auth, limitFind);
router.get("/:id", findById);
router.get("/limit/:id", auth, limitFindById);
router.post("/", auth, upload);
router.patch("/:id", auth, checkPicExists, update);
router.delete("/:id", auth, del);
router.put("/followPics/:id", auth, checkPicExists, followPics);
router.delete("/followPics/:id", auth, checkPicExists, unfollowPics);
router.get("/followPics/:id", listFollowPics);

module.exports = router;
