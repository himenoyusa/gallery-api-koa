const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const User = require("../models/User");
const Collection = require("../models/Collection");
const Picture = require("../models/Picture");
const Follower = require("../models/Follower");
Collection.hasOne(Picture, {
  sourceKey: "picture_id",
  foreignKey: "picture_id",
});

class UserCtl {
  /**
   * 查询所有用户
   */
  async findAllUsers(ctx) {
    const { offset, limit } = ctx.pagination;
    const users = await User.findAndCountAll({
      attributes: { exclude: ["password"] },
      offset,
      limit,
    });
    ctx.body = users;
  }

  /**
   * 查询单个用户
   */
  async findById(ctx) {
    const { uid } = ctx.params;
    const user = await User.findByPk(uid, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      ctx.throw(404, "用户不存在");
    }
    ctx.body = user;
  }

  /**
   * 用户注册，默认未审核
   */
  async registration(ctx) {
    ctx.verifyParams({
      email: { type: "email", required: true, allowEmpty: false },
      password: { type: "string", required: true, allowEmpty: false },
    });
    const { email, password } = ctx.request.body;
    // 检查重复用户
    const created = await User.findOne({ where: { email } });
    if (created) {
      ctx.throw(409, "用户已经被占用");
    }

    const hash = await bcrypt.hash(password, 10);
    await User.create({ email, password: hash });
    ctx.body = { email };
  }

  /**
   * 更新用户信息
   */
  async update(ctx) {
    const uid = ctx.params.uid;
    ctx.verifyParams({
      name: { type: "string", required: false, allowEmpty: false },
      gender: {
        type: "enum",
        values: ["男", "女", "未知"],
        required: false,
        allowEmpty: false,
      },
      headline: { type: "string", required: false, allowEmpty: true },
      age: {
        type: "int",
        max: 1000,
        min: 0,
        required: false,
        allowEmpty: true,
      },
    });

    await User.update(
      { ...ctx.request.body },
      {
        where: { uid },
        fields: ["name", "gender", "headline", "age"],
      }
    );
    ctx.body = { ...ctx.request.body };
  }

  /**
   * 更新头像
   */
  async updateAvatar(ctx) {
    const { uid } = ctx.params;
    try {
      const { newAvatar } = ctx.request.files;
      const fileName = path.basename(newAvatar.path);
      // 移动图片并重命名
      fs.rename(
        `${__dirname}/../public/pictures/${fileName}`,
        `${__dirname}/../public/avatars/${uid}.jpg`,
        (e) => {}
      );

      const avatar_url = `${process.env.domain}/avatars/${uid}.jpg`;
      await User.update({ avatar_url }, { where: { uid } });
      ctx.status = 204;
    } catch (e) {
      ctx.throw(422, "头像更新失败");
    }
  }

  /**
   * 用户登录
   */
  async login(ctx) {
    ctx.verifyParams({
      email: { type: "email", required: true },
      password: { type: "string", required: true },
    });
    const { email, password } = ctx.request.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      ctx.throw(401, "用户名或密码不正确");
    }
    // verify the password
    if (!bcrypt.compareSync(password, user.password)) {
      ctx.throw(401, "用户名或密码不正确");
    }
    if (user.verified === false) {
      ctx.throw(401, "用户未通过审核");
    }

    const { uid, avatar_url, age } = user;
    // 中文转码
    let { gender, name, headline, level } = user;
    gender = encodeURIComponent(gender);
    name = encodeURIComponent(name);
    headline = encodeURIComponent(headline);
    level = encodeURIComponent(level);
    const token = jsonwebtoken.sign(
      { uid, name, email, avatar_url, gender, headline, age, level },
      process.env.secret,
      {
        expiresIn: "30d",
      }
    );
    ctx.body = { token };
  }

  /**
   * 查询是否已关注
   */
  async checkFollower(ctx) {
    const { uid: follower_id } = ctx.params;
    const { uid: user_id } = ctx.state.user;
    const state = await Follower.findOne({ where: { user_id, follower_id } });
    if (!state) {
      ctx.throw(404, "用户未关注");
    }
    ctx.status = 204;
  }

  /**
   * 查询用户关注
   */
  async listFollowing(ctx) {
    const { uid } = ctx.params;
    const { offset, limit } = ctx.pagination;

    Follower.hasOne(User, {
      sourceKey: "followed_id",
      foreignKey: "uid",
    });
    ctx.body = await Follower.findAndCountAll({
      where: { user_id: uid },
      offset,
      limit,
      include: {
        model: User,
        attributes: ["uid", "name", "avatar_url", "gender", "headline", "age"],
      },
    });
  }

  /**
   * 查询用户粉丝
   */
  async listFollowers(ctx) {
    const uid = ctx.params.uid;
    const { offset, limit } = ctx.pagination;

    Follower.hasOne(User, {
      sourceKey: "user_id",
      foreignKey: "uid",
    });
    ctx.body = await Follower.findAndCountAll({
      where: { followed_id: uid },
      offset,
      limit,
      include: {
        model: User,
        attributes: ["uid", "name", "avatar_url", "gender", "headline", "age"],
      },
    });
  }

  /**
   * 关注用户
   */
  async follow(ctx) {
    const followed_id = ctx.params.uid * 1;
    const { uid: user_id } = ctx.state.user;
    if (followed_id === user_id) {
      ctx.throw(409, "不能关注自己");
      return;
    }

    const user = await User.findByPk(followed_id);
    if (!user) {
      ctx.throw(404, "用户不存在");
      return;
    }

    const follower = await Follower.findOne({
      where: { followed_id, user_id },
    });
    if (!follower) {
      await Follower.create({ followed_id, user_id });
    }

    ctx.status = 204;
  }

  /**
   * 取消关注
   */
  async unfollow(ctx) {
    const followed_id = ctx.params.uid * 1;
    const { uid: user_id } = ctx.state.user;
    await Follower.destroy({ where: { followed_id, user_id } });
    ctx.status = 204;
  }

  /**
   * 查询用户图片收藏
   */
  async findUserCollections(ctx) {
    const uid = ctx.params.uid;
    const { offset, limit } = ctx.pagination;
    ctx.body = await Collection.findAndCountAll({
      where: { user_id: uid },
      offset,
      limit,
      // 左关联 Picture 表
      include: { model: Picture },
    });
  }

  /**
   * 查询用户图片上传
   */
  async findUserUploads(ctx) {
    const uid = ctx.params.uid;
    const { offset, limit } = ctx.pagination;
    ctx.body = await Picture.findAndCountAll({
      where: { created_by: uid },
      offset,
      limit,
    });
  }
}

module.exports = new UserCtl();
