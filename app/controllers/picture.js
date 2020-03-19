const PictureModel = require("../models/Picture");

module.exports = {
  // 获取单张图片
  get: async ctx => {
    let picture = await PictureModel.get(ctx.params.pid);
    ctx.response.body = { data: picture };
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
    throw new Error("TODO");
  },
  delete: async ctx => {
    throw new Error("TODO");
  }
};
