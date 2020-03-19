const ScoreModel = require("../models/Score");

module.exports = {
  // 获取单张图片
  get: async ctx => {
    let scores = await ScoreModel.getOnePictureScore(ctx.params.sid);
    ctx.response.body = { data: scores };
  },
  upload: async ctx => {
    throw new Error("TODO");
  },
  delete: async ctx => {
    throw new Error("TODO");
  }
};
