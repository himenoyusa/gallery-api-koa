const Router = require("koa-router");
const router = new Router({ prefix: "/swaggerDoc" });
const swaggerSpec = require("../swagger.conf");

/**
 * @swagger
 *
 * definitions:
 *  picture:
 *    type: object
 *    properties:
 *      _id:
 *        type: string
 *      pic_dir:
 *        type: string
 *      thumb_dir:
 *        type: string
 *      created_by:
 *        type: string
 *      createdAt:
 *        type: number
 *      updatedAt:
 *        type: number
 *      limit:
 *        type: boolean
 *      tags:
 *        type: array
 *        items:
 *          $ref: '#/definitions/tag'
 *  comment:
 *    type: object
 *    properties:
 *      _id:
 *        type: string
 *      content:
 *        type: string
 *      picture_id:
 *        type: string
 *      commenter:
 *        type: string
 *      createdAt:
 *        type: number
 *      updatedAt:
 *        type: number
 *  tag:
 *    type: object
 *    properties:
 *      _id:
 *        type: string
 *      tag:
 *        type: string
 *      avatar_url:
 *        type: string
 *  user:
 *    type: object
 *    properties:
 *      _id:
 *        type: string
 *      verified:
 *        type: boolean
 *      name:
 *        type: string
 *      avatar_url:
 *        type: string
 *      age:
 *        type: number
 *      createdAt:
 *        type: number
 *      updatedAt:
 *        type: number
 *      gender:
 *        type: string
 *        enum:
 *        - 男
 *        - 女
 *        - 其他
 *      level:
 *        type: string
 *        enum:
 *        - admin
 *        - vip
 *        - guest
 *      locations:
 *        type: array
 *        items:
 *          type: string
 *      following:
 *        type: array
 *        items:
 *          type: string
 *      followPics:
 *        type: array
 *        items:
 *          type: string
 *
 * securityDefinitions:
 *  api_key:
 *    type: apiKey
 *    name: Authorization
 *    in: header
 */

router.get("/", async (ctx) => {
  ctx.body = swaggerSpec;
});

module.exports = router;
