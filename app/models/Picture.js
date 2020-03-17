const Sequelize = require("sequelize");
const sequelize = require("./index");

const PageSize = 9;
const BoxSize = 3;

var Picture = sequelize.define(
  "picture",
  {
    picture_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    picture_dir: Sequelize.STRING,
    thumb_dir: Sequelize.STRING,
    total_score: Sequelize.INTEGER,
    create_by: Sequelize.INTEGER,
    create_time: Sequelize.INTEGER,
    edit_by: Sequelize.INTEGER,
    edit_time: Sequelize.INTEGER,
    r18: Sequelize.BOOLEAN
  },
  {
    timestamps: false
  }
);

module.exports = {
  // 获取首页图片组
  getThumbList: async (orderType = "", page = 1) => {
    const off = (page - 1) * PageSize;
    switch (orderType) {
      case "time":
        var orderArray = ["create_time", "ASC"];
        break;
      case "score":
        var orderArray = ["total_score", "DESC"];
        break;
      default:
        var orderArray = ["create_time", "DESC"];
    }
    return Picture.findAll({
      order: [orderArray],
      offset: off,
      limit: PageSize
    });
  },
  // 获取首页跑马灯图片
  getPictureBox: async () => {
    return Picture.findAll({
      order: sequelize.random(),
      limit: BoxSize
    });
  },
  // 获取单张图片
  get: async pid => {
    return await Picture.findOne({
      where: {
        picture_id: 1
      }
    });
  },
  upload: async () => {
    await Picture.create({}).then();
  },
  update: async pid => {
    await Picture.update(
      {},
      {
        where: { picture_id: pid }
      }
    ).then(() => {
      return true;
    });
  },
  delete: async pid => {
    await Picture.destroy({
      where: { picture_id: pid }
    }).then(() => {
      return true;
    });
  }
};
