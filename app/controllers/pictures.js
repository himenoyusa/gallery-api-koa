const Picture = require("../models/pictures");
const jsonwebtoken = require("jsonwebtoken");
const path = require("path");

class PictureCtl {
  async find(ctx) {
    ctx.body = await Picture.find().ne("limit", true);
  }

  async limitFind(ctx) {
    ctx.body = await Picture.find().ne("limit", false);
  }

  async findById(ctx) {
    const picture = await Picture.findById(ctx.params.id).ne("limit", true);
    if (!picture) {
      ctx.throw(404, "图片不存在");
    }
    ctx.body = picture;
  }

  async limitFindById(ctx) {
    const picture = await Picture.findById(ctx.params.id);
    if (!picture) {
      ctx.throw(404, "图片不存在");
    }
    ctx.body = picture;
  }

  async upload(ctx) {
    ctx.verifyParams({
      limit: { type: "boolean", required: false },
    });
    const { uploadPic, uploadThumb } = ctx.request.files;
    const pic_dir = `${ctx.origin}/uploads/${path.basename(uploadPic.path)}`;
    const thumb_dir = `${ctx.origin}/uploads/${path.basename(
      uploadThumb.path
    )}`;

    const { limit } = ctx.request.body;
    const created_by = ctx.state.user._id;

    const newPic = await new Picture({
      pic_dir,
      thumb_dir,
      limit,
      created_by,
    }).save();
    ctx.body = newPic;
  }

  async update(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: false },
      password: { type: "string", required: false },
      age: { type: "number", required: false },
    });
    const updateUser = await User.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body
    );
    if (!updateUser) {
      ctx.throw(404);
    }
    ctx.body = updateUser;
  }

  async del(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true },
    });
    const delUser = await User.findByIdAndRemove(ctx.params.id);
    if (!delUser) {
      ctx.throw(404);
    }
    ctx.status = 204;
  }
}

module.exports = new PictureCtl();
