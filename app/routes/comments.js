const Router = require("koa-router");
const router = new Router({ prefix: "/api/comments" });
const {
  listComments,
  addComment,
  delComment,
} = require("../controllers/comments");

const jwtAuth = require("../middlewares/jwtAuth");
const setPagination = require("../middlewares/setPagination");

/**
 * @swagger
 * tags:
 *    name: Comment
 *    description: "评论接口"
 */

/**
 * @swagger
 * /api/comments/pictures/{picture_id}:
 *    get:
 *      tags:
 *      - Comment
 *      description: 查询特定图片的所有评论
 *      parameters:
 *      - in: path
 *        name: picture_id
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
router.get("/picture/:picture_id", setPagination, listComments);

/**
 * @swagger
 * /api/comments/pictures/{picture_id}:
 *    post:
 *      tags:
 *      - Comment
 *      description: 新建特定图片下的评论
 *      parameters:
 *      - in: path
 *        name: picture_id
 *        description: 图片 id
 *        required: true
 *      - in: header
 *        name: token
 *        description: 用户登录 token
 *        required: true
 *      - in: body
 *        name: comment
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
router.post("/picture/:picture_id", jwtAuth, addComment);

/**
 * @swagger
 * /api/comments/{comment_id}:
 *    delete:
 *      tags:
 *      - Comment
 *      description: 删除评论
 *      parameters:
 *      - in: path
 *        name: comment_id
 *        description: 评论 id
 *        required: true
 *      - in: header
 *        name: token
 *        description: 用户登录 token
 *        required: true
 *      response:
 *        204:
 *          description: No Content
 *        403:
 *          description: Forbidden
 *      security:
 *      - Authorization
 */
router.delete("/:comment_id", jwtAuth, delComment);

module.exports = router;
