const Router = require("koa-router");
const router = new Router({ prefix: "/api/tags" });
const jwt = require("koa-jwt");
const { find, create, findPicsByTag } = require("../controllers/tags");
const { checkPicExists } = require("../controllers/pictures");

const secret = process.env.secret;

const auth = jwt({ secret });

/**
 * @swagger
 * tags:
 *    name: Tag
 *    description: "标签接口"
 */

/**
 * @swagger
 * /api/tags:
 *    get:
 *      tags:
 *      - Tag
 *      description: 分页查询所有标签
 *      parameters:
 *      - in: query
 *        name: page
 *        description: 分页页码
 *        required: false
 *      - in: query
 *        name: per_page
 *        description: 分页每页数量
 *        required: false
 *      responses:
 *        200:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/definitions/tag'
 *        404:
 *          description: Not Found
 */
router.get("/", find);

/**
 * @swagger
 * /api/tags/{id}:
 *    get:
 *      tags:
 *      - Tag
 *      description: 查询包含特定标签的图片
 *      parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        description: 图片 id
 *        required: true
 *      responses:
 *        200:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/definitions/picture'
 *        404:
 *          description: Not Found
 */
router.get("/:id", findPicsByTag);

/**
 * @swagger
 * /api/tags:
 *    post:
 *      tags:
 *      - Tag
 *      description: 特定图片添加标签
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        description: 用户登录 token
 *        required: true
 *      - in: formData
 *        name: tag
 *        type: string
 *        description: 标签名
 *        required: true
 *      responses:
 *        204:
 *          description: No Content
 *        403:
 *          description: Forbidden
 *      security:
 *      - Authorization
 */
router.post("/:id", auth, checkPicExists, create);
// router.delete("/:id", auth, del);

module.exports = router;
