const Comment = require("../models/comments");

class CommentsCtl {
  // 查询单个图片的所有评论
  async find(ctx) {
    let { page = 1, per_page = 10 } = ctx.query;
    page = Math.max(page * 1, 1) - 1;
    per_page = Math.max(per_page * 1, 1);

    ctx.body = await Comment.find({ picture_id: ctx.params.id })
      .populate("commenter")
      .skip(page * per_page)
      .limit(per_page);
  }

  // 添加评论
  async create(ctx) {
    ctx.verifyParams({
      content: { type: "string", required: true },
    });
    const uid = ctx.state.user._id;
    const pid = ctx.params.id;

    const comment = await new Comment({
      ...ctx.request.body,
      commenter: uid,
      picture_id: pid,
    }).save();
    ctx.body = comment;
  }

  async del(ctx) {
    await Comment.findByIdAndRemove(ctx.params.id);
    ctx.status = 204;
  }
}

module.exports = new CommentsCtl();
