const path = require("path");
const fs = require("fs");
const Picture = require("../models/Picture");
const Collection = require("../models/Collection");
const Score = require("../models/Score");

class PictureCtl {
  /**
   * 分页查询所有图片
   */
  async find(ctx) {
    const { offset, limit } = ctx.pagination;
    let orderType = ctx.query.order_type;
    orderType = ["picture_id", "collection_count"].includes(orderType)
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
    const { picture_id } = ctx.params;
    const picture = await Picture.findByPk(picture_id);
    if (!picture || picture.limit) {
      ctx.throw(404, "图片不存在");
    }
    const scores = await Score.findAll({ where: { picture_id } });
    ctx.body = { ...picture.dataValues, scores };
  }

  async findLimitPicture(ctx) {
    const { picture_id } = ctx.params;
    const picture = await Picture.findByPk(picture_id);
    if (!picture) {
      ctx.throw(404, "图片不存在");
    }
    const scores = await Score.findAll({ where: { picture_id } });
    ctx.body = { ...picture.dataValues, scores };
  }

  /**
   * 上传图片
   */
  async uploadPicture(ctx) {
    try {
      const { uploadPic } = ctx.request.files;
      const { uploadThumb } = ctx.request.body; // 获取上传的 base64 缩略
      const fileName = path.basename(uploadPic.path);

      // 转换缩略图格式并保存文件
      let base64Data = uploadThumb.replace(/^data:image\/\w+;base64,/, "");
      let dataBuffer = Buffer.alloc(base64Data.length, base64Data, "base64");
      fs.writeFile(
        `${__dirname}/../public/pictures/thumbs/${fileName}.jpg`,
        dataBuffer,
        function (e) {}
      );

      const created_by = ctx.state.user.uid;
      const picture_url = `${process.env.domain}/pictures/${fileName}`;
      const thumb_url = `${process.env.domain}/pictures/thumbs/${fileName}.jpg`;

      const newPic = await Picture.create({
        picture_url,
        thumb_url,
        created_by,
      });
      newPic.picture_id = newPic.null;
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
   * 查询图片是否收藏
   */
  async getStarStatus(ctx) {
    const picture_id = ctx.params.picture_id * 1;
    const { uid: user_id } = ctx.state.user;
    const status = await Collection.findOne({ where: { user_id, picture_id } });
    if (status) {
      ctx.body = status;
    } else {
      ctx.throw(404, "图片未收藏");
    }
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
