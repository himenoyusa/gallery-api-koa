const Sequelize = require("sequelize");
const sequelize = require("./index");

var Tag = sequelize.define(
  "tag",
  {
    tag_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    picture_id: Sequelize.INTEGER,
    tag: Sequelize.STRING,
    create_by: Sequelize.INTEGER
  },
  {
    timestamps: false
  }
);

module.exports = {
  /**
   * 获取单张图片所有 tag
   */
  getOnePictureTag: async picture_id => {
    return Tag.findByPk(picture_id);
  },
  /**
   * 新增 tag
   */
  upload: async (picture_id, tag, create_by) => {
    return await Tag.create({
      picture_id,
      tag,
      create_by
    });
  },
  /**
   * 更新 tag
   */
  update: async picture_id => {
    await Tag.update(
      {},
      {
        where: { picture_id }
      }
    ).then(() => {
      return true;
    });
  },
  /**
   * 删除 tag
   */
  delete: async tag_id => {
    return await Tag.destroy({ where: { tag_id } });
  }
};
