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
  // 获取单张图片所有 score
  getOnePictureScore: async pid => {
    return Score.findAll({
      where: {
        picture_id: pid
      }
    });
  },
  upload: async () => {
    await Score.create({}).then();
  },
  update: async pid => {
    await Score.update(
      {},
      {
        where: { picture_id: pid }
      }
    ).then(() => {
      return true;
    });
  },
  delete: async pid => {
    await Score.destroy({
      where: { picture_id: pid }
    }).then(() => {
      return true;
    });
  }
};
