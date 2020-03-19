const { HttpException } = require(`${process.cwd()}/core/http-exception`);

// 全局错误处理
const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    const isDev = global.config.environment === "dev";
    const isHttpException = e instanceof HttpException;
    if (isDev && !isHttpException) {
      throw e;
    }
    if (isHttpException) {
      ctx.body = {
        errorCode: e.errorCode,
        msg: e.msg,
        request: `${ctx.method} ${ctx.path}`
      };
      ctx.status = e.statusCode;
    } else {
      ctx.body = {
        errorCode: 9999,
        msg: "服务器未知错误",
        request: `${ctx.method} ${ctx.path}`
      };
      ctx.status = 500;
    }
  }
};

module.exports = catchError;
