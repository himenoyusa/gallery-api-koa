const Router = require("koa-router");
const router = new Router({ prefix: "/api/swaggerDoc" });
const swaggerSpec = require("../swagger.conf");

/**
 * @swagger
 *
 * definitions:
 *  picture:
 *    type: object
 *    properties:
 *      picture_id:
 *        type: number
 *      picture_url:
 *        type: string
 *      thumb_url:
 *        type: string
 *      created_by:
 *        type: number
 *      updated_by:
 *        type: number
 *      created_at:
 *        type: string
 *      updated_at:
 *        type: string
 *      limit:
 *        type: boolean
 *      collection_count:
 *        type: number
 *      scores:
 *        type: array
 *        items:
 *          $ref: '#/definitions/score'
 *  score:
 *    type: object
 *    properties:
 *      score_id:
 *        type: number
 *      picture_id:
 *        type: number
 *      created_by:
 *        type: number
 *      score:
 *        type: number
 *      created_at:
 *        type: string
 *      updated_at:
 *        type: string
 *  comment:
 *    type: object
 *    properties:
 *      comment_id:
 *        type: number
 *      comment:
 *        type: string
 *      picture_id:
 *        type: number
 *      user_id:
 *        type: number
 *      created_at:
 *        type: string
 *      updated_at:
 *        type: string
 *      user:
 *        type: object
 *        $ref: '#/definitions/user'
 *  tag:
 *    type: object
 *    properties:
 *      tag_id:
 *        type: number
 *      picture_id:
 *        type: number
 *      created_by:
 *        type: number
 *      tag:
 *        type: string
 *      tag_avatar_url:
 *        type: string
 *      created_at:
 *        type: string
 *      updated_at:
 *        type: string
 *  collection:
 *    type: object
 *    properties:
 *      collection_id:
 *        type: number
 *      user_id:
 *        type: number
 *      picture_id:
 *        type: number
 *      created_at:
 *        type: string
 *      updated_at:
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
 *      created_at:
 *        type: string
 *      updated_at:
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
