const Router = require("koa-router");
const router = new Router({ prefix: "/api/pictures" });
const {
  find,
  limitFind,
  uploadPicture,
  findPicture,
  findLimitPicture,
  updatePicture,
  del,
  starPicture,
  unStarPicture,
} = require("../controllers/picture");
const { addScore, delScore } = require("../controllers/score");

// 引入中间件
const jwtAuth = require("../middlewares/jwtAuth");
const setPagination = require("../middlewares/setPagination");

/**
 * @swagger
 * tags:
 *    name: Picture
 *    description: "图片接口"
 */

/**
 * @swagger
 * /api/pictures:
 *    get:
 *      tags:
 *      - Picture
 *      description: 分页查询所有图片
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
 *              $ref: '#/definitions/picture'
 *        404:
 *          description: Not Found
 */
router.get("/", setPagination, find);
router.get("/limit", jwtAuth, setPagination, limitFind);

/**
 * @swagger
 * /api/pictures/{picture_id}:
 *    get:
 *      tags:
 *      - Picture
 *      description: 查询特定图片
 *      parameters:
 *      - in: path
 *        name: picture_id
 *        type: string
 *        description: 图片 id
 *        required: true
 *      responses:
 *        200:
 *          schema:
 *            $ref: '#/definitions/picture'
 *        400:
 *          description: Not Found
 */
router.get("/:picture_id", findPicture);
router.get("/:picture_id/limit", jwtAuth, findLimitPicture);

/**
 * @swagger
 * /api/pictures:
 *    post:
 *      tags:
 *      - Picture
 *      description: 上传图片
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        description: 用户登录 token
 *        required: true
 *      - in: formData
 *        name: uploadPic
 *        type: file
 *        description: 图片文件
 *        required: true
 *      - in: formData
 *        name: uploadThumb
 *        type: file
 *        description: 缩略图文件
 *        required: true
 *      responses:
 *        200:
 *          schema:
 *            $ref: '#/definitions/picture'
 *        403:
 *          description: Forbidden
 *      security:
 *      - Authorization
 */
router.post("/", jwtAuth, uploadPicture);

/**
 * @swagger
 * /api/pictures/{picture_id}:
 *    patch:
 *      tags:
 *      - Picture
 *      description: 修改图片信息
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        description: 用户登录 token
 *        required: true
 *      - in: path
 *        name: picture_id
 *        type: string
 *        description: 图片 id
 *        required: true
 *      - in: formData
 *        name: picture_url
 *        type: string
 *        description: 图片路径
 *        required: false
 *      - in: formData
 *        name: thumb_url
 *        type: string
 *        description: 缩略图路径
 *        required: false
 *      - in: formData
 *        name: limit
 *        type: boolean
 *        required: false
 *      responses:
 *        200:
 *          schema:
 *            $ref: '#/definitions/picture'
 *        403:
 *          description: Forbidden
 *      security:
 *      - Authorization
 */
router.patch("/:picture_id", jwtAuth, updatePicture);

/**
 * @swagger
 * /api/pictures/collections/{picture_id}:
 *    put:
 *      tags:
 *      - Picture
 *      description: 收藏图片
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        description: 用户登录 token
 *        required: true
 *      - in: path
 *        name: picture_id
 *        type: string
 *        description: 图片 id
 *        required: true
 *      responses:
 *        204:
 *          description: No Content
 *        403:
 *          description: Forbidden
 *      security:
 *      - Authorization
 */
router.put("/collections/:picture_id", jwtAuth, starPicture);

/**
 * @swagger
 * /api/pictures/collections/{picture_id}:
 *    delete:
 *      tags:
 *      - Picture
 *      description: 取消图片收藏
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        description: 用户登录 token
 *        required: true
 *      - in: path
 *        name: picture_id
 *        type: string
 *        description: 图片 id
 *        required: true
 *      responses:
 *        204:
 *          description: No Content
 *        403:
 *          description: Forbidden
 *      security:
 *      - Authorization
 */
router.delete("/collections/:picture_id", jwtAuth, unStarPicture);

/**
 * @swagger
 * /api/pictures/scores/{picture_id}:
 *    post:
 *      tags:
 *      - Picture
 *      description: 添加图片评分
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        description: 用户登录 token
 *        required: true
 *      - in: path
 *        name: picture_id
 *        type: string
 *        description: 图片 id
 *        required: true
 *      - in: formData
 *        name: score
 *        type: number
 *        description: 分数
 *        required: true
 *      responses:
 *        204:
 *          description: No Content
 *        403:
 *          description: Forbidden
 *      security:
 *      - Authorization
 */
router.post("/scores/:picture_id", jwtAuth, addScore);

/**
 * @swagger
 * /api/pictures/scores/{score_id}:
 *    delete:
 *      tags:
 *      - Picture
 *      description: 删除图片评分
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        description: 用户登录 token
 *        required: true
 *      - in: path
 *        name: score_id
 *        type: string
 *        description: 评分 id
 *        required: true
 *      responses:
 *        204:
 *          description: No Content
 *        403:
 *          description: Forbidden
 *      security:
 *      - Authorization
 */
router.delete("/scores/:score_id", jwtAuth, delScore);

/**
 * @swagger
 * /api/pictures/{picture_id}:
 *    delete:
 *      tags:
 *      - Picture
 *      description: 删除图片
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        description: 用户登录 token
 *        required: true
 *      - in: path
 *        name: picture_id
 *        type: string
 *        description: 图片 id
 *        required: true
 *      responses:
 *        204:
 *          description: No Content
 *        403:
 *          description: Forbidden
 *      security:
 *      - Authorization
 */
router.delete("/:picture_id", jwtAuth, del);

module.exports = router;
