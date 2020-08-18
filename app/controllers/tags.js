const Tag = require("../models/tags");
const Picture = require("../models/pictures");

class TagsCtl {
  // 查询所有 tag
  async find(ctx) {
    let { page = 1, per_page = 10 } = ctx.query;
    page = Math.max(page * 1, 1) - 1;
    per_page = Math.max(per_page * 1, 1);
    ctx.body = await Tag.find()
      .skip(page * per_page)
      .limit(per_page);
  }

  // 为图片添加 tag
  async create(ctx) {
    ctx.verifyParams({
      tag: { type: "string", required: true },
      avatar_url: { type: "string", required: false },
    });
    const picture = await Picture.findById(ctx.params.id).select("+tags");
    const tag = await Tag.findOne({ tag: ctx.request.body.tag });

    // 新 tag 直接加入图片的 tags 中并保存
    if (!tag) {
      const newTag = await new Tag(ctx.request.body).save();
      picture.tags.push(newTag._id);
      picture.save();
      ctx.status = 204;
      return;
    }

    // 旧 tag 但图片未添加
    if (!picture.tags.includes(tag._id)) {
      picture.tags.push(tag._id);
      picture.save();
      ctx.status = 204;
      return;
    }

    // tag 已存在
    ctx.throw(409, "tag 已存在");
  }

  // 查询包含 tag 的所有图片
  async findPicsByTag(ctx) {
    let { page = 1, per_page = 10 } = ctx.query;
    page = Math.max(page * 1, 1) - 1;
    per_page = Math.max(per_page * 1, 1);
    ctx.body = await Picture.find({ tags: ctx.params.id })
      .skip(page * per_page)
      .limit(per_page);
  }

  // TODO: 删除功能待完善
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
