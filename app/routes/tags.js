const Router = require("koa-router");
const router = new Router({ prefix: "/api/tags" });
const {
  findAllTags,
  findPictureTags,
  findPicturesByTag,
  addTag,
  delTag,
} = require("../controllers/tag");

// 引入中间件
const jwtAuth = require("../middlewares/jwtAuth");
const setPagination = require("../middlewares/setPagination");

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
 *            type: object
 *            properties:
 *              count:
 *                type: number
 *              rows:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/tag'
 *        404:
 *          description: Not Found
 */
router.get("/", setPagination, findAllTags);

/**
 * @swagger
 * /api/tags/{tag}:
 *    get:
 *      tags:
 *      - Tag
 *      description: 查询包含特定标签的图片
 *      parameters:
 *      - in: path
 *        name: tag
 *        type: string
 *        description: 标签名
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
 *              $ref: '#/definitions/tag'
 *        404:
 *          description: Not Found
 */
router.get("/:tag", setPagination, findPicturesByTag);
router.get("/:tag/limit", setPagination, findPicturesByTag);

/**
 * @swagger
 * /api/tags/picture/{picture_id}:
 *    get:
 *      tags:
 *      - Tag
 *      description: 查询特定图片的所有标签
 *      parameters:
 *      - in: path
 *        name: picture_id
 *        type: number
 *        description: 图片 id
 *        required: true
 *      responses:
 *        200:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/definitions/tag'
 *        404:
 *          description: Not Found
 */
router.get("/picture/:picture_id", findPictureTags);

/**
 * @swagger
 * /api/tags/{picture_id}:
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
 *      - in: params
 *        name: picture_id
 *        type: number
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
router.post("/:picture_id", jwtAuth, addTag);

/**
 * @swagger
 * /api/tags/{tag_id}:
 *    delete:
 *      tags:
 *      - Tag
 *      description: 删除特定图片的 tag
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        description: 用户登录 token
 *        required: true
 *      - in: params
 *        name: tag_id
 *        type: number
 *        required: true
 *      responses:
 *        204:
 *          description: No Content
 *        403:
 *          description: Forbidden
 *      security:
 *      - Authorization
 */
router.delete("/:tag_id", jwtAuth, delTag);

module.exports = router;
