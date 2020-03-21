const router = require("koa-router")({ prefix: "/api/tag" });
const TagController = require(`${process.cwd()}/app/controllers/tag`);
const Auth = require(`${process.cwd()}/middlewares/auth`);

router.get("/:pid", TagController.getOnePictureTag);
router.post("/", new Auth().m, TagController.upload);
router.delete("/:tid", new Auth().m, TagController.delete);

module.exports = router;
