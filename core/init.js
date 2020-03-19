const requireDirectory = require("require-directory");
const Router = require("koa-router");

class InitManager {
  static initCore(app) {
    // 入口方法
    InitManager.loadConfig();
    InitManager.initLoadRouters(app);
  }

  // 加载配置，绑定为全局变量
  static loadConfig(path = "") {
    const configPath = path || `${process.cwd()}/config/config.js`;
    const config = require(configPath);
    global.config = config;
  }

  // 加载所有路由
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
