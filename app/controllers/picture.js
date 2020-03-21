const PictureModel = require("../models/Picture");
const {
  Response,
  Success,
  HttpException,
  Forbidden
} = require(`${process.cwd()}/core/http-exception`);

module.exports = {
  /**
   * 获取图片列表
   */
  getThumbList: async ctx => {
    r18 = false;
    let list = await PictureModel.getThumbList(
      ctx.params.orderType,
      ctx.params.page,
      r18
    );
    throw new Response(list);
  },
  /**
   * 获取 R18 图片列表
   */
  getR18ThumbList: async ctx => {
    r18 = true;
    let list = await PictureModel.getThumbList(
      ctx.params.orderType,
      ctx.params.page,
      r18
    );
    throw new Response(list);
  },
  /**
   * 获取跑马灯随机图片
   */
  getPictureBox: async ctx => {
    let list = await PictureModel.getPictureBox();
    throw new Response(list);
  },
  /**
   * 获取单张图片
   */
  get: async ctx => {
    let picture = await PictureModel.get(ctx.params.pid);
    throw new Response(picture);
  },
  /**
   * 上传图片，待完善
   */
  upload: async ctx => {
    throw new HttpException("TODO");
  },
  /**
   * 删除图片
   */
  delete: async ctx => {
    let result = await PictureModel.delete(ctx.params.pid);
    if (result) {
      throw new Success("图片删除成功");
    }
    throw new HttpException("图片删除失败");
  }
};
