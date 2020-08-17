const Tag = require("../models/tags");
const Picture = require("../models/pictures");

class TagsCtl {
  async find(ctx) {
    ctx.body = await Tag.find();
  }

  async findByTag(ctx) {
    ctx.verifyParams({
      tag: { type: "string", required: true },
    });
    const pictures = await Picture.find({ tags: new RegExp(ctx.query.q) });
    ctx.body = pictures;
  }

  async create(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: true },
      avatar_url: { type: "string", required: false },
    });
    const tag = await new Tag(ctx.request.body).save();
    ctx.body = tag;
  }

  async del(ctx) {
    const picture = await Picture.findById(ctx.params.picId).select("+tags");
    const index = picture.tags
      .map((id) => id.toString())
      .indexOf(ctx.params.id);
    if (index > -1) {
      me.following.splice(index, 1);
      me.save();
    }
    ctx.status = 204;
  }
}

module.exports = new TagsCtl();
