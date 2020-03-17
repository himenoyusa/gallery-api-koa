const requireDirectory = require("require-directory");
const Router = require("koa-router");

class InitManager {
  static initCore(app) {
    //入口方法
    InitManager.loadConfig();
    InitManager.initLoadRouters(app);
  }

  static loadConfig(path = "") {
    const configPath = path || `${process.cwd()}/config/config.js`;
    const config = require(configPath);
    global.config = config;
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
