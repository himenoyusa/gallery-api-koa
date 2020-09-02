const path = require("path");
const fs = require("fs");
const Picture = require("../models/Picture");
const Collection = require("../models/Collection");

class PictureCtl {
  /**
   * 分页查询所有图片
   */
  async find(ctx) {
    const { offset, limit } = ctx.pagination;
    let orderType = ctx.query.order_type;
    orderType = ["picture_id", "score", "collection_count"].includes(orderType)
      ? orderType
      : "picture_id";
    ctx.body = await Picture.findAndCountAll({
      where: { limit: false },
      order: [[orderType, "DESC"]],
      offset,
      limit,
    });
  }

  async limitFind(ctx) {
    const { offset, limit } = ctx.pagination;
    let orderType = ctx.query.order_type;
    orderType = ["picture_id", "score", "collection_count"].includes(orderType)
      ? orderType
      : "picture_id";
    ctx.body = await Picture.findAndCountAll({
      where: { limit: true },
      order: [[orderType, "DESC"]],
      offset,
      limit,
    });
  }

  /**
   * 查询特定图片
   */
  async findPicture(ctx) {
    const picture = await Picture.findByPk(ctx.params.picture_id);
    if (!picture || picture.limit) {
      ctx.throw(404, "图片不存在");
    }
    ctx.body = picture;
  }

  async findLimitPicture(ctx) {
    const picture = await Picture.findByPk(ctx.params.picture_id);
    if (!picture) {
      ctx.throw(404, "图片不存在");
    }
    ctx.body = picture;
  }

  /**
   * 上传图片
   */
  async uploadPicture(ctx) {
    try {
      const { uploadPic, uploadThumb } = ctx.request.files;

      // 移动缩略图
      await fs.rename(
        uploadThumb.path,
        `${__dirname}/../public/pictures/thumbs/${path.basename(
          uploadThumb.path
        )}`,
        (err) => {
          if (err) {
            throw err;
          }
        }
      );

      // 生成图片路径
      const thumb_url = `${ctx.origin}/pictures/thumbs/${path.basename(
        uploadThumb.path
      )}`;
      const picture_url = `${ctx.origin}/pictures/${path.basename(
        uploadPic.path
      )}`;
      const created_by = ctx.state.user.uid;

      const newPic = await Picture.create({
        picture_url,
        thumb_url,
        created_by,
      });
      ctx.body = newPic;
    } catch (e) {
      ctx.throw(422, "图片上传失败");
    }
  }

  /**
   * 更新图片信息
   */
  async updatePicture(ctx) {
    ctx.verifyParams({
      picture_url: { type: "string", required: false },
      thumb_url: { type: "string", required: false },
      limit: { type: "boolean", required: false },
    });
    const { picture_id } = ctx.params;
    const updated_by = ctx.state.user.uid;

    const update = await Picture.update(
      { updated_by, picture_id, ...ctx.request.body },
      {
        where: { picture_id },
        fields: ["updated_by", "picture_url", "thumb_url", "limit"],
      }
    );
    if (!update[0]) {
      ctx.throw(409, "图片无需更新");
      return;
    }
    ctx.body = { ...ctx.request.body };
  }

  /**
   * 收藏图片
   */
  async starPicture(ctx) {
    const picture_id = ctx.params.picture_id * 1;
    const { uid: user_id } = ctx.state.user;

    const picture = await Picture.findByPk(picture_id);
    if (!picture) {
      ctx.throw(404, "图片不存在");
      return;
    }

    const star = await Collection.findOne({
      where: { picture_id, user_id },
    });
    if (!star) {
      await Collection.create({ picture_id, user_id });
      await Picture.update(
        { collection_count: picture.collection_count + 1 },
        { where: { picture_id } }
      );
    }

    ctx.status = 204;
  }

  // 取消收藏
  async unStarPicture(ctx) {
    const picture_id = ctx.params.picture_id * 1;
    const { uid: user_id } = ctx.state.user;

    const picture = await Picture.findByPk(picture_id);
    if (!picture) {
      ctx.throw(404, "图片不存在");
      return;
    }

    const star = await Collection.findOne({
      where: { picture_id, user_id },
    });
    if (star) {
      await Collection.destroy({ where: { picture_id, user_id } });
      await Picture.update(
        { collection_count: picture.collection_count - 1 },
        { where: { picture_id } }
      );
    }
    ctx.status = 204;
  }

  /**
   * 删除图片
   */
  async del(ctx) {
    // TODO: 待完善
    ctx.status = 204;
  }
}

module.exports = new PictureCtl();