const xss = require("xss");
const Comment = require("../models/Comment");
const User = require("../models/User");
Comment.hasOne(User, {
  sourceKey: "user_id",
  foreignKey: "uid",
});

class CommentsCtl {
  /**
   * 查询图片所有评论
   */
  async listComments(ctx) {
    const { offset, limit } = ctx.pagination;
    const { picture_id } = ctx.params;
    ctx.body = await Comment.findAndCountAll({
      where: { picture_id },
      offset,
      limit,
      include: { model: User },
    });
  }

  /**
   * 添加图片评论
   */
  async addComment(ctx) {
    const { picture_id } = ctx.params;
    const { uid: user_id } = ctx.state.user;
    const comment = xss(ctx.request.body.comment);
    await Comment.create({ user_id, picture_id, comment });
    ctx.body = { comment };
  }

  /**
   * 删除评论
   */
  async delComment(ctx) {
    const { comment_id } = ctx.params;
    await Comment.destroy({ where: { comment_id } });
    ctx.status = 204;
  }
}

module.exports = new CommentsCtl();
