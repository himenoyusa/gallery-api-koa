const requireDirectory = require("require-directory");
const Router = require("koa-router");

class InitManager {
  static initCore(app) {
    //入口方法
    InitManager.initLoadRouters(app);
  }

  static initLoadRouters(app) {
    const apiDirectory = `${process.cwd()}/app/api`;
    requireDirectory(module, apiDirectory, { visit: whenLoadModule });
    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        app.use(obj.routes());
      }
    }
  }
}

module.exports = InitManager;
