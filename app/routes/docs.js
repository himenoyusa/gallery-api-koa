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
 *      picture_id:
 *        type: string
 *      picture_url:
 *        type: string
 *      thumb_url:
 *        type: string
 *      created_by:
 *        type: string
 *      updated_by:
 *        type: string
 *      created_at:
 *        type: number
 *      updated_at:
 *        type: number
 *      limit:
 *        type: boolean
 *      collection_count:
 *        type: number
 *      score:
 *        type: number
 *  comment:
 *    type: object
 *    properties:
 *      comment_id:
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
 *      tag_id:
 *        type: string
 *      tag:
 *        type: string
 *      avatar_url:
 *        type: string
 *  user:
 *    type: object
 *    properties:
 *      uid:
 *        type: number
 *      verified:
 *        type: boolean
 *      name:
 *        type: string
 *      avatar_url:
 *        type: string
 *      age:
 *        type: number
 *      email:
 *        type: string
 *      gender:
 *        type: string
 *        enum:
 *        - 男
 *        - 女
 *        - 未知
 *      level:
 *        type: string
 *        enum:
 *        - admin
 *        - vip
 *        - guest
 *      headline:
 *        type: string
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
