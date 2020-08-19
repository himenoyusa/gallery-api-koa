const xss = require("xss");

async function xssCheck(ctx, next) {
  //TODO: 修改xss中间件
  await next();
}

module.exports = xssCheck;
