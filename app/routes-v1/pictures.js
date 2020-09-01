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
router.get("/", find);
router.get("/limit", auth, limitFind);

/**
 * @swagger
 * /api/pictures/{id}:
 *    get:
 *      tags:
 *      - Picture
 *      description: 查询特定图片
 *      parameters:
 *      - in: path
 *        name: id
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
router.get("/:id", findById);
router.get("/limit/:id", auth, limitFindById);

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
router.post("/", auth, upload);

/**
 * @swagger
 * /api/pictures/{id}:
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
 *        name: id
 *        type: string
 *        description: 图片 id
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
 *      deprecated: true
 */
router.patch("/:id", auth, checkPicExists, update);

/**
 * @swagger
 * /api/pictures/{id}:
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
 *        name: id
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
router.delete("/:id", auth, del);

/**
 * @swagger
 * /api/pictures/followPics/{id}:
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
 *        name: id
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
router.put("/followPics/:id", auth, checkPicExists, followPics);

/**
 * @swagger
 * /api/pictures/followPics/{id}:
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
 *        name: id
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
router.delete("/followPics/:id", auth, checkPicExists, unfollowPics);

/**
 * @swagger
 * /api/pictures/followPics/{id}:
 *    get:
 *      tags:
 *      - Picture
 *      description: 查询特定用户的图片收藏
 *      parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        description: 用户 id
 *        required: true
 *      responses:
 *        204:
 *          description: No Content
 *        403:
 *          description: Forbidden
 */
router.get("/followPics/:id", listFollowPics);

module.exports = router;
