const Router = require("koa-router");
const router = new Router({ prefix: "/api/users" });
const jwt = require("koa-jwt");
const {
  checkOwner,
  checkUserExist,
  find,
  findById,
  create,
  update,
  del,
  login,
  listFollowing,
  listFollowers,
  follow,
  unfollow,
} = require("../controllers/users");

const secret = process.env.secret;

const auth = jwt({ secret });

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
router.get("/", find);

/**
 * @swagger
 * /api/users/{id}:
 *    get:
 *      tags:
 *      - User
 *      description: 查询特定用户
 *      parameters:
 *      - in: path
 *        name: id
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
router.get("/:id", findById);

/**
 * @swagger
 * /api/users:
 *    post:
 *      tags:
 *      - User
 *      description: 新建用户
 *      parameters:
 *      - in: body
 *        name: name
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
router.post("/", create);

/**
 * @swagger
 * /api/users/{id}:
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
 *        name: id
 *        type: string
 *        description: 用户 id
 *        required: true
 *      - in: body
 *        name: avatar_url
 *        type: string
 *        description: 用户头像
 *        required: false
 *      - in: body
 *        name: avatar_url
 *        type: string
 *        description: 用户头像
 *        required: false
 *      - in: body
 *        name: avatar_url
 *        type: string
 *        description: 用户头像
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
router.patch("/:id", auth, checkOwner, update);

router.delete("/:id", auth, checkOwner, del);

/**
 * @swagger
 * /api/users:
 *    post:
 *      tags:
 *      - User
 *      description: 用户登录
 *      parameters:
 *      - in: body
 *        name: name
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
 * /api/users/{id}/following:
 *    get:
 *      tags:
 *      - User
 *      description: 查询特定用户的关注
 *      parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        description: 用户 id
 *        required: true
 *      responses:
 *        200:
 *          schema:
 *            type: array
 *            item:
 *              $ref: '#/definitions/user'
 *        404:
 *          description: Not Found
 */
router.get("/:id/following", listFollowing);

/**
 * @swagger
 * /api/users/{id}/followers:
 *    get:
 *      tags:
 *      - User
 *      description: 查询特定用户的粉丝
 *      parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        description: 用户 id
 *        required: true
 *      responses:
 *        200:
 *          schema:
 *            type: array
 *            item:
 *              $ref: '#/definitions/user'
 *        404:
 *          description: Not Found
 */
router.get("/:id/followers", listFollowers);

/**
 * @swagger
 * /api/users/following/{id}:
 *    put:
 *      tags:
 *      - User
 *      description: 关注特定用户
 *      parameters:
 *      - in: path
 *        name: id
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
router.put("/following/:id", auth, checkUserExist, follow);

/**
 * @swagger
 * /api/users/following/{id}:
 *    delete:
 *      tags:
 *      - User
 *      description: 取消关注特定用户
 *      parameters:
 *      - in: path
 *        name: id
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
router.delete("/following/:id", auth, checkUserExist, unfollow);

module.exports = router;
