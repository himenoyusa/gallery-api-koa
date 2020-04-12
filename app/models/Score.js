const Sequelize = require("sequelize");
const sequelize = require("./index");

var Score = sequelize.define(
  "score",
  {
    score_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    picture_id: Sequelize.INTEGER,
    score: Sequelize.INTEGER,
    create_by: Sequelize.INTEGER,
    create_time: Sequelize.INTEGER,
    edit_by: Sequelize.INTEGER,
    edit_time: Sequelize.INTEGER
  },
  {
    timestamps: false
  }
);

module.exports = {
  /**
   * 获取单张图片所有 score
   */
  getOnePictureScore: async picture_id => {
    return await Score.findByPk(picture_id);
  },
  /**
   * 新增 score
   */
  upload: async (picture_id, score, create_by) => {
    const time = Math.round(new Date().getTime() / 1000);
    return await Score.create({
      picture_id,
      score,
      create_by,
      create_time: time
    });
  },
  /**
   * 更新 score
   */
  update: async pid => {},
  /**
   * 删除 score
   */
  delete: async score_id => {
    return await Score.destroy({ where: { score_id } });
  }
};
