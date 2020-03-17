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
  // 获取单张图片所有 tag
  getOnePictureTag: async pid => {
    return Tag.findAll({
      where: {
        picture_id: pid
      }
    });
  },
  upload: async () => {
    await Tag.create({}).then();
  },
  update: async pid => {
    await Tag.update(
      {},
      {
        where: { picture_id: pid }
      }
    ).then(() => {
      return true;
    });
  },
  delete: async pid => {
    await Tag.destroy({
      where: { picture_id: pid }
    }).then(() => {
      return true;
    });
  }
};
