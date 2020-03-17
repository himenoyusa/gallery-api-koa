const PictureModel = require("../models/Picture");
// const HttpException = require(`${process.cwd()}/core/HttpException`);
const {
  PositiveIntegerValidator
} = require(`${process.cwd()}/app/validators/validator`);

module.exports = {
  // 获取单张图片
  get: async ctx => {
    const validator = new PositiveIntegerValidator().validate(ctx);
    let picture = await PictureModel.get(ctx.params.pid);
    ctx.response.body = { data: picture };
  },
  getThumbList: async ctx => {
    // throw new HttpException("api error", 2000, 500);
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
