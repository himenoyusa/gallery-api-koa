const Router = require("koa-router");
const router = new Router({ prefix: "/api/pictures/:id/comments" });
const jwt = require("koa-jwt");
const { find, create } = require("../controllers/comments");
const { checkPicExists } = require("../controllers/pictures");

const secret = process.env.secret;

const auth = jwt({ secret });

/**
 * @swagger
 * tags:
 *    name: Comment
 *    description: "评论接口"
 */

/**
 * @swagger
 * /api/pictures/{id}/comments:
 *    get:
 *      tags:
 *      - Comment
 *      description: 查询特定图片的所有评论
 *      parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        description: 图片 id
 *        required: true
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
 *              $ref: '#/definitions/comment'
 *        404:
 *          description: Not Found
 */
router.get("/", find);

/**
 * @swagger
 * /api/pictures/{id}/comments:
 *    post:
 *      tags:
 *      - Comment
 *      description: 新建特定图片下的评论
 *      parameters:
 *      - in: path
 *        name: id
 *        description: 图片 id
 *        required: true
 *      - in: header
 *        name: token
 *        description: 用户登录 token
 *        required: true
 *      - in: body
 *        name: content
 *        type: string
 *        description: 评论内容
 *        required: true
 *      responses:
 *        200:
 *          schema:
 *            $ref: '#/definitions/comment'
 *        404:
 *          description: Not Found
 *      security:
 *      - Authorization
 */
router.post("/", auth, checkPicExists, create);

module.exports = router;
