const ScoreModel = require("../models/Score");

module.exports = {
  // 获取单张图片
  get: async ctx => {
    let scores = await ScoreModel.get(ctx.params.pid);
    ctx.response.body = { data: scores };
  },
  getThumbList: async ctx => {
    let list = await PictureModel.getThumbList(
      ctx.params.orderType,
      ctx.params.page
    );
    ctx.response.body = {
      data: list,
      status: true
    };
  },
  getPictureBox: async ctx => {
    let list = await PictureModel.getPictureBox();
    ctx.response.body = {
      data: list,
      status: true
    };
  },
  upload: async ctx => {
    return true;
  },
  delete: async ctx => {
    return true;
  }
};
