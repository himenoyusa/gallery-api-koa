const Router = require("koa-router");
const router = new Router({ prefix: "/api/user" });

const { findUserCollections } = require("../controllers/user");
const setPagination = require("../middlewares/setPagination");

router.get("/:uid/collections", setPagination, findUserCollections);

module.exports = router;
