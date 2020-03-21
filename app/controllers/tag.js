const TagModel = require("../models/Tag");
const {
  Response,
  HttpException,
  Success
} = require(`${process.cwd()}/core/http-exception`);

module.exports = {
  /**
   * 获取单张图片所有 tag
   */
  getOnePictureTag: async ctx => {
    let tags = await TagModel.getOnePictureTag(ctx.params.pid);
    throw new Response(tags);
  },
  /**
   * 新增 tag
   */
  upload: async ctx => {
    const uid = 1; // TODO: 存入当前用户 ID
    let result = await TagModel.upload(
      ctx.request.body.pid,
      ctx.request.body.tag,
      uid
    );
    if (result) {
      throw new Success("Tag 添加成功");
    }
    throw new HttpException("Tag 添加失败");
  },
  /**
   * 删除 tag
   */
  delete: async ctx => {
    let result = await TagModel.delete(ctx.params.tid);
    if (result) {
      throw new Success("Tag 删除成功");
    }
    throw new HttpException("Tag 删除失败");
  }
};
