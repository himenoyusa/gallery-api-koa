const Picture = require("../models/pictures");
const User = require("../models/users");
const path = require("path");

class PictureCtl {
  /**
   * ---------------------------------------
   * 中间件
   * ---------------------------------------
   */
  async checkPicExists(ctx, next) {
    const picture = await Picture.findById(ctx.params.id);
    if (!picture) {
      ctx.throw(404, "图片不存在");
    }
    await next();
  }

  /**
   * ---------------------------------------
   * 控制器方法
   * ---------------------------------------
   */

  async find(ctx) {
    let { page = 1, per_page = 10, order = "_id" } = ctx.query;
    page = Math.max(page * 1, 1) - 1;
    per_page = Math.max(per_page * 1, 1);
    order = ["_id", "total_score"].includes(order) ? order : "_id";
    ctx.body = await Picture.find({ limit: false })
      .sort({ order: -1 })
      .skip(page * per_page)
      .limit(per_page);
  }

  async limitFind(ctx) {
    let { page = 1, per_page = 10 } = ctx.query;
    page = Math.max(page * 1, 1) - 1;
    per_page = Math.max(per_page * 1, 1);
    ctx.body = await Picture.find({ limit: true })
      .skip(page * per_page)
      .limit(per_page);
  }

  async findById(ctx) {
    const picture = await Picture.findById(ctx.params.id)
      .ne("limit", true)
      .populate("tags");
    if (!picture) {
      ctx.throw(404, "图片不存在");
    }
    ctx.body = picture;
  }

  async limitFindById(ctx) {
    const picture = await Picture.findById(ctx.params.id).populate("tags");
    if (!picture) {
      ctx.throw(404, "图片不存在");
    }
    ctx.body = picture;
  }

  async upload(ctx) {
    ctx.verifyParams({
      limit: { type: "boolean", required: false },
    });
    try {
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
    } catch (e) {
      ctx.throw(422, "图片上传失败");
    }
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
      ctx.throw(404, "用户不存在");
    }
    ctx.body = updateUser;
  }

  async del(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true },
    });
    const delUser = await User.findByIdAndRemove(ctx.params.id);
    if (!delUser) {
      ctx.throw(404, "用户不存在");
    }
    ctx.status = 204;
  }

  // 查询用户收藏的图片
  async listFollowPics(ctx) {
    const user = await User.findById(ctx.params.id)
      .select("+followPics")
      .populate("followPics");
    if (!user) {
      ctx.throw(404, "用户不存在");
    }
    ctx.body = user.followPics;
  }

  // 收藏图片
  async followPics(ctx) {
    const me = await User.findById(ctx.state.user._id).select("+followPics");
    if (!me.followPics.map((id) => id.toString()).includes(ctx.params.id)) {
      me.followPics.push(ctx.params.id);
      me.save();
    }
    ctx.status = 204;
  }

  // 取消收藏
  async unfollowPics(ctx) {
    const me = await User.findById(ctx.state.user._id).select("+followPics");
    const index = me.followPics
      .map((id) => id.toString())
      .indexOf(ctx.params.id);
    if (index > -1) {
      me.followPics.splice(index, 1);
      me.save();
    }
    ctx.status = 204;
  }
}

module.exports = new PictureCtl();
