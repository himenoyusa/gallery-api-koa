const PictureModel = require("../models/Picture");

module.exports = {
  get: async ctx => {
    let picture = await PictureModel.get(ctx.params.pid);
    ctx.response.body = { data: picture };
  }
};
