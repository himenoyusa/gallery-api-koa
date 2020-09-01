const Collection = require("../models/Collection");
const Picture = require("../models/Picture");
Collection.hasOne(Picture, { foreignKey: "picture_id" });

class UserCtl {
  /**
   * 查询用户的图片收藏
   */
  async findUserCollections(ctx) {
    const uid = ctx.params.uid;
    const { offset, limit } = ctx.pagination;
    ctx.body = await Collection.findAndCountAll({
      where: { user_id: uid },
      limit,
      offset,
      // 左关联 Picture 表
      include: [{ model: Picture }],
    });
  }
}

module.exports = new UserCtl();
