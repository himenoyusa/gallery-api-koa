const Tag = require("../models/Tag");
const Picture = require("../models/Picture");
Tag.hasOne(Picture, {
  sourceKey: "picture_id",
  foreignKey: "picture_id",
});

class TagCtl {
  // 查询所有 tag
  async findAllTags(ctx) {
    const { offset, limit } = ctx.pagination;
    ctx.body = await Tag.findAndCountAll({
      offset,
      limit,
    });
  }

  // 查询包含特定 tag 的所有图片
  async findPicturesByTag(ctx) {
    const { offset, limit } = ctx.pagination;
    const { tag } = ctx.params;

    ctx.body = await Tag.findAndCountAll({
      where: { tag },
      offset,
      limit,
      include: { model: Picture },
    });
  }

  // 为图片添加 tag
  async addTag(ctx) {
    ctx.verifyParams({
      tag: { type: "string", required: true },
    });
    const { picture_id } = ctx.params;
    const { tag } = ctx.request.body;
    const { uid: created_by } = ctx.state.user;

    const sameTag = await Tag.findOne({ where: { picture_id, tag } });
    if (sameTag) {
      ctx.throw(409, "tag 已存在");
      return;
    }

    await Tag.create({ picture_id, tag, created_by });
    ctx.status = 204;
  }

  // 删除 tag
  async delTag(ctx) {
    const { tag_id } = ctx.params;
    await Tag.destroy({ where: { tag_id } });
    ctx.status = 204;
  }
}

module.exports = new TagCtl();
