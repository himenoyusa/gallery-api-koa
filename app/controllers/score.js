const Score = require("../models/Score");

class ScoreCtl {
  /**
   * 为图片添加评分
   */
  async addScore(ctx) {
    const { picture_id } = ctx.params;
    const { uid: created_by } = ctx.state.user;
    const score = ctx.request.body.score * 1;
    await Score.create({ picture_id, created_by, score });
    ctx.status = 204;
  }

  /**
   * 删除图片评分
   */
  async delScore(ctx) {
    const { score_id } = ctx.params;
    await Score.destroy({ where: { score_id } });
    ctx.status = 204;
  }
}

module.exports = new ScoreCtl();
