const PictureModel = require("../models/Picture");
const ScoreModal = require("../models/Score");
const TagModal = require("../models/Tag");
const {
  Response,
  Success,
  HttpException,
  Forbidden,
} = require(`${process.cwd()}/core/http-exception`);
const { PidValidator } = require(`${process.cwd()}/app/validators/validator`);

module.exports = {
  /**
   * 获取图片列表
   */
  getThumbList: async (ctx) => {
    let r18 = false;
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
  getR18ThumbList: async (ctx) => {
    let r18 = true;
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
  getPictureBox: async (ctx) => {
    let list = await PictureModel.getPictureBox();
    throw new Response(list);
  },
  /**
   * 获取单张图片
   */
  get: async (ctx) => {
    const v = await new PidValidator().validate(ctx);
    const pid = v.get("path.pid");
    let picture = await PictureModel.get(pid);
    let scores = await ScoreModal.getOnePictureScore(pid);
    let tags = await TagModal.getOnePictureTag(pid);
    throw new Response({ picture, scores, tags });
  },
  /**
   * TODO:df
   */
  upload: async (ctx) => {
    throw new HttpException("TODO");
  },
  /**
   * 删除图片
   */
  delete: async (ctx) => {
    const v = await new PidValidator().validate(ctx);
    let result = await PictureModel.delete(v.get("path.pid"));
    if (result) {
      throw new Success("图片删除成功");
    }
    throw new HttpException("图片删除失败");
  },
};
