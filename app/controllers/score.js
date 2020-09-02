const Score = require("../models/Score");

class ScoreCtl {
  /**
   * 为图片添加评分
   */
  async addScore(ctx) {
    ctx.status = 204;
  }
}

module.exports = new ScoreCtl();
