const HttpException = require(`${process.cwd()}/core/HttpException`);

const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    if (e instanceof HttpException) {
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
