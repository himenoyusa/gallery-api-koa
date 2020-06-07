const Sequelize = require("sequelize");
const sequelize = require("./index");

const PageSize = 9;
const BoxSize = 3;

var Picture = sequelize.define(
  "picture",
  {
    picture_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    picture_dir: Sequelize.STRING,
    thumb_dir: Sequelize.STRING,
    total_score: Sequelize.INTEGER,
    create_by: Sequelize.INTEGER,
    create_time: Sequelize.INTEGER,
    edit_by: Sequelize.INTEGER,
    edit_time: Sequelize.INTEGER,
    r18: Sequelize.BOOLEAN,
  },
  {
    timestamps: false,
  }
);

module.exports = {
  /**
   * 获取首页图片缩略图
   */
  getThumbList: async (orderType = "", page = 1, r18) => {
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
    let result = await Picture.findAndCountAll({
      where: {
        r18,
      },
      order: [orderArray],
      offset: off,
      limit: PageSize,
    });
    const total = result.count;
    const thumbs = result.rows;
    return { thumbs, total };
  },
  /**
   * 获取首页跑马灯随机图
   */
  getPictureBox: async () => {
    return await Picture.findAll({
      where: {
        r18: false,
      },
      order: sequelize.random(),
      limit: BoxSize,
    });
  },
  /**
   * 获取单张图片
   */
  get: async (picture_id) => {
    return await Picture.findByPk(picture_id);
  },
  /**
   * 上传图片
   * @param picture array
   */
  upload: (picture_dir, thumb_dir, create_by, r18 = false) => {
    const create_time = Math.floor(Date.now() / 1000);
    try {
      (async () => {
        await Picture.create({
          picture_dir,
          thumb_dir,
          create_by,
          r18,
          edit_by: create_by,
          create_time,
          edit_time: create_time,
        });
      })();
      return true;
    } catch (e) {
      return false;
    }
  },
  /**
   * 更新图片信息
   */
  update: async (picture_id) => {
    await Picture.update(
      {},
      {
        where: { picture_id },
      }
    ).then(() => {
      return true;
    });
  },
  /**
   * 删除图片
   */
  delete: async (pid) => {
    return await Picture.destroy({ where: { pid } });
  },
};
