const ScoreModel = require("../models/Score");
const {
  Response,
  HttpException,
  Success
} = require(`${process.cwd()}/core/http-exception`);

module.exports = {
  /**
   * 获取单张图片所有评分
   */
  getOnePictureScore: async ctx => {
    let scores = await ScoreModel.getOnePictureScore(ctx.params.pid);
    throw new Response(scores);
  },
  /**
   * 新增评分
   */
  upload: async ctx => {
    const uid = 1; // TODO: 存入当前用户 ID
    let result = await ScoreModel.upload(
      ctx.request.body.pid,
      ctx.request.body.score,
      uid
    );
    if (result) {
      throw new Success("评分成功");
    }
    throw new HttpException("评分失败");
  },
  /**
   * 删除评分
   */
  delete: async ctx => {
    let result = await ScoreModel.delete(ctx.params.sid);
    if (result) {
      throw new Success("评分删除成功");
    }
    throw new HttpException("评分删除失败");
  }
};
