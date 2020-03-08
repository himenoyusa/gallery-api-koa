const path = require("path");
const bodyParser = require("koa-bodyparser");
const staticFiles = require("koa-static");

module.exports = app => {
  // 指定 static 文件夹为静态资源目录
  app.use(staticFiles(path.resolve(__dirname, "./static")));

  app.use(bodyParser());
};
