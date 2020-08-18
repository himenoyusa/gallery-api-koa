const Comment = require("../models/comments");

class CommentsCtl {
  async find(ctx) {
    let { page = 1, per_page = 10 } = ctx.query;
    page = Math.max(page * 1, 1) - 1;
    per_page = Math.max(per_page * 1, 1);

    ctx.body = await Comment.find()
      .skip(page * per_page)
      .limit(per_page);
  }

  async findByComment(ctx) {
    ctx.verifyParams({
      Comment: { type: "string", required: true },
    });
    const Comments = await Comment.find({ Comments: new RegExp(ctx.query.q) });
    ctx.body = Comments;
  }

  async create(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: true },
      avatar_url: { type: "string", required: false },
    });
    const Comment = await new Comment(ctx.request.body).save();
    ctx.body = Comment;
  }

  async del(ctx) {
    const Comment = await Comment.findById(ctx.params.picId).select(
      "+Comments"
    );
    const index = Comment.Comments.map((id) => id.toString()).indexOf(
      ctx.params.id
    );
    if (index > -1) {
      me.following.splice(index, 1);
      me.save();
    }
    ctx.status = 204;
  }
}

module.exports = new CommentsCtl();
