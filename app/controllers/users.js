const User = require("../models/users");
const jsonwebtoken = require("jsonwebtoken");

class UserCtl {
  /**
   * -----------------------------------------------
   * 中间件
   * -----------------------------------------------
   */

  // 对登录用户进行鉴权
  async checkOwner(ctx, next) {
    if (
      ctx.params.id !== ctx.state.user._id &&
      ctx.state.user.level !== "admin"
    ) {
      ctx.throw(403, "无操作权限");
    }
    await next();
  }
  // 检查请求的目标用户是否存在
  async checkUserExist(ctx, next) {
    ctx.verifyParams({
      id: { type: "string", required: true },
    });
    const user = await User.findById(ctx.params.id);
    if (!user) {
      ctx.throw(404, "用户不存在");
    }
    await next();
  }

  /**
   * -----------------------------------------------
   * 控制器方法
   * -----------------------------------------------
   */

  // 查询所有用户
  async find(ctx) {
    ctx.body = await User.find().ne("level", "admin");
  }

  // 查询单个用户
  async findById(ctx) {
    const { fields = "" } = ctx.query;
    const selectFields = fields
      .split(";")
      .map((f) => {
        if (f === "password") {
          return;
        }
        return " +" + f;
      })
      .join("");
    const user = await await User.findById(ctx.params.id).select(selectFields);
    if (!user) {
      ctx.throw(404, "用户不存在");
    }
    ctx.body = user;
  }

  // 新增用户，默认未审核
  async create(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: true },
      password: { type: "string", required: true },
    });
    const { name } = ctx.request.body;
    const repeatedUser = await User.findOne({ name });
    if (repeatedUser) {
      ctx.throw(409, "用户已经被占用");
    }
    const newUser = await new User(ctx.request.body).save();
    ctx.body = newUser;
  }

  // 修改用户资料
  async update(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: false },
      password: { type: "string", required: false },
      avatar_url: { type: "string", required: false },
      gender: { type: "string", required: false },
      headline: { type: "string", required: false },
      age: { type: "number", required: false },
      locations: { type: "array", itemType: "string", required: false },
      business: { type: "string", required: false },
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

  // 删除用户
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

  // 用户登录
  async login(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: true },
      password: { type: "string", required: true },
    });
    const user = await User.findOne(ctx.request.body);
    if (!user) {
      ctx.throw(401, "用户名或密码不正确");
    }
    if (user.verified === false) {
      ctx.throw(401, "用户未通过审核");
    }
    const { _id, name, level } = user;
    const token = jsonwebtoken.sign({ _id, name, level }, process.env.secret, {
      expiresIn: "1d",
    });
    ctx.body = { token };
  }

  // 查询用户关注列表
  async listFollowing(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true },
    });
    const user = await User.findById(ctx.params.id)
      .select("+following")
      .populate("following");
    if (!user) {
      ctx.throw(404, "用户不存在");
    }
    ctx.body = user.following;
  }

  // 关注用户
  async follow(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true },
    });
    const me = await User.findById(ctx.state.user._id).select("+following");
    if (!me.following.map((id) => id.toString()).includes(ctx.params.id)) {
      me.following.push(ctx.params.id);
      me.save();
    }
    ctx.status = 204;
  }

  // 查询用户粉丝列表
  async listFollowers(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true },
    });
    const users = await User.find({ following: ctx.params.id });
    ctx.body = users;
  }

  // 取消关注
  async unfollow(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true },
    });
    const me = await User.findById(ctx.state.user._id).select("+following");
    const index = me.following
      .map((id) => id.toString())
      .indexOf(ctx.params.id);
    if (index > -1) {
      me.following.splice(index, 1);
      me.save();
    }
    ctx.status = 204;
  }
}

module.exports = new UserCtl();
