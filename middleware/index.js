const path = require("path");
const bodyParser = require("koa-bodyparser");
const staticFiles = require("koa-static");

const jwt = require("./jwt");

module.exports = app => {
  // 指定 static 文件夹为静态资源目录
  app.use(staticFiles(path.resolve(__dirname, "./static")));
  // jwt 验证
  jwt(app);
  // 前端请求参数
  app.use(bodyParser());
};
