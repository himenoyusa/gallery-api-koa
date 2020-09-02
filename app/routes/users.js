const Router = require("koa-router");
const router = new Router({ prefix: "/api/users" });

// 引入中间件
const jwtAuth = require("../middlewares/jwtAuth");
const setPagination = require("../middlewares/setPagination");
const checkOwner = require("../middlewares/checkOwner");

// 引入控制器
const {
  findUserCollections,
  findAllUsers,
  findById,
  registration,
  update,
  login,
  listFollowing,
  listFollowers,
  follow,
  unfollow,
} = require("../controllers/user");

/**
 * @swagger
 * tags:
 *    name: User
 *    description: "用户接口"
 */

/**
 * @swagger
 * /api/users:
 *    get:
 *      tags:
 *      - User
 *      description: 分页查询所有用户
 *      parameters:
 *      - in: query
 *        name: page
 *        type: number
 *        description: 分页页码
 *        required: false
 *      - in: query
 *        name: per_page
 *        type: number
 *        description: 分页每页数量
 *        required: false
 *      responses:
 *        200:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/definitions/user'
 *        404:
 *          description: Not Found
 */
router.get("/", setPagination, findAllUsers);

/**
 * @swagger
 * /api/users/{uid}:
 *    get:
 *      tags:
 *      - User
 *      description: 查询特定用户
 *      parameters:
 *      - in: path
 *        name: uid
 *        type: string
 *        description: 用户 id
 *        required: true
 *      responses:
 *        200:
 *          schema:
 *            $ref: '#/definitions/user'
 *        404:
 *          description: Not Found
 */
router.get("/:uid", findById);

/**
 * @swagger
 * /api/users:
 *    post:
 *      tags:
 *      - User
 *      description: 新建用户
 *      parameters:
 *      - in: body
 *        name: email
 *        type: string
 *        description: 用户账号，email 格式
 *        required: true
 *      - in: body
 *        name: password
 *        type: string
 *        description: 用户密码
 *        required: true
 *      responses:
 *        200:
 *          schema:
 *            $ref: '#/definitions/user'
 *        422:
 *          description: UnprocessableEntityError
 *      security:
 *      - Authorization
 */
router.post("/", registration);

/**
 * @swagger
 * /api/users/{uid}:
 *    patch:
 *      tags:
 *      - User
 *      description: 修改用户信息
 *      parameters:
 *      - in: header
 *        name: Authorization
 *        type: string
 *        description: 用户登录 token
 *        required: true
 *      - in: path
 *        name: uid
 *        type: string
 *        description: 用户 id
 *        required: true
 *      - in: body
 *        name: avatar_url
 *        type: string
 *        description: 用户头像
 *        required: false
 *      - in: body
 *        name: name
 *        type: string
 *        description: 用户昵称
 *        required: false
 *      - in: body
 *        name: gender
 *        type: string
 *        description: 用户性别
 *        required: false
 *      - in: body
 *        name: headline
 *        type: string
 *        description: 用户签名
 *        required: false
 *      - in: body
 *        name: age
 *        type: number
 *        description: 用户年龄
 *        required: false
 *      responses:
 *        200:
 *          schema:
 *            $ref: '#/definitions/user'
 *        403:
 *          description: Forbidden
 *        404:
 *          description: 用户不存在
 *      security:
 *      - Authorization
 */
router.patch("/:uid", jwtAuth, checkOwner, update);

/**
 * @swagger
 * /api/users:
 *    post:
 *      tags:
 *      - User
 *      description: 用户登录
 *      parameters:
 *      - in: body
 *        name: email
 *        type: string
 *        description: 用户账号，email 格式
 *        required: true
 *      - in: body
 *        name: password
 *        type: string
 *        description: 用户密码
 *        required: true
 *      responses:
 *        200:
 *          schema:
 *            token: string
 *        401:
 *          description: 用户名或密码错误
 *        422:
 *          description: 参数错误
 */
router.post("/login", login);

/**
 * @swagger
 * /api/users/{uid}/following:
 *    get:
 *      tags:
 *      - User
 *      description: 查询特定用户的关注
 *      parameters:
 *      - in: path
 *        name: uid
 *        type: string
 *        description: 用户 id
 *        required: true
 *      - in: query
 *        name: page
 *        type: number
 *        description: 分页页码
 *        required: false
 *      - in: query
 *        name: per_page
 *        type: number
 *        description: 分页每页数量
 *        required: false
 *      responses:
 *        200:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/definitions/user'
 *        404:
 *          description: Not Found
 */
router.get("/:uid/following", setPagination, listFollowing);

/**
 * @swagger
 * /api/users/{uid}/followers:
 *    get:
 *      tags:
 *      - User
 *      description: 查询特定用户的粉丝
 *      parameters:
 *      - in: path
 *        name: uid
 *        type: string
 *        description: 用户 id
 *        required: true
 *      - in: query
 *        name: page
 *        type: number
 *        description: 分页页码
 *        required: false
 *      - in: query
 *        name: per_page
 *        type: number
 *        description: 分页每页数量
 *        required: false
 *      responses:
 *        200:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/definitions/user'
 *        404:
 *          description: Not Found
 */
router.get("/:uid/followers", setPagination, listFollowers);

/**
 * @swagger
 * /api/users/following/{uid}:
 *    put:
 *      tags:
 *      - User
 *      description: 关注特定用户
 *      parameters:
 *      - in: path
 *        name: uid
 *        type: string
 *        description: 用户 id
 *        required: true
 *      - in: header
 *        name: Authorization
 *        type: string
 *        description: 用户登录 token
 *        required: true
 *      responses:
 *        204:
 *          description: No Content
 *        404:
 *          description: Not Found
 *      security:
 *      - Authorization
 */
router.put("/following/:uid", jwtAuth, follow);

/**
 * @swagger
 * /api/users/following/{uid}:
 *    delete:
 *      tags:
 *      - User
 *      description: 取消关注特定用户
 *      parameters:
 *      - in: path
 *        name: uid
 *        type: string
 *        description: 用户 id
 *        required: true
 *      - in: header
 *        name: Authorization
 *        type: string
 *        description: 用户登录 token
 *        required: true
 *      responses:
 *        204:
 *          description: No Content
 *        404:
 *          description: Not Found
 *      security:
 *      - Authorization
 */
router.delete("/following/:uid", jwtAuth, unfollow);

/**
 * @swagger
 * /api/users/{uid}/collections:
 *    get:
 *      tags:
 *      - User
 *      description: 查询特定用户的图片收藏
 *      parameters:
 *      - in: path
 *        name: uid
 *        type: string
 *        description: 用户 id
 *        required: true
 *      - in: query
 *        name: page
 *        type: number
 *        description: 分页页码
 *        required: false
 *      - in: query
 *        name: per_page
 *        type: number
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
router.get("/:uid/collections", setPagination, findUserCollections);

module.exports = router;
