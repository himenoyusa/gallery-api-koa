const Router = require("koa-router");
const router = new Router({ prefix: "/pictures" });
const jwt = require("koa-jwt");
const {
  find,
  limitFind,
  upload,
  findById,
  limitFindById,
  update,
  del,
} = require("../controllers/pictures");

const secret = process.env.secret;

const auth = jwt({ secret });

router.get("/", find);
router.get("/limit", auth, limitFind);
router.get("/:id", findById);
router.get("/limit/:id", auth, limitFindById);
router.post("/", auth, upload);
router.patch("/:id", auth, update);
router.delete("/:id", auth, del);

module.exports = router;
