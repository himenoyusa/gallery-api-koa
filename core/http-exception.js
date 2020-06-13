class HttpException extends Error {
  constructor(msg = "", data = {}, errorCode = 5000, statusCode = 500) {
    super();
    this.data = data;
    this.errorCode = errorCode;
    this.msg = msg;
    this.statusCode = statusCode;
  }
}
// TODO: 修改接口的 errorCode 为 statusCode
class Success extends HttpException {
  constructor(msg = "操作成功", errorCode = 2001) {
    super();
    this.errorCode = errorCode;
    this.msg = msg;
    this.statusCode = 201;
  }
}

class Response extends HttpException {
  constructor(data = {}) {
    super();
    if (!data) {
      throw new NotFound("找不到数据");
    }
    this.data = data;
    this.errorCode = 2000;
    this.statusCode = 200;
  }
}

class ParameterException extends HttpException {
  constructor(msg = "参数错误", errorCode = 4000) {
    super();
    this.errorCode = errorCode;
    this.msg = msg;
    this.statusCode = 400;
  }
}

class Forbidden extends HttpException {
  constructor(msg = "禁止访问", errorCode = 4003) {
    super();
    this.errorCode = errorCode;
    this.msg = msg;
    this.statusCode = 403;
  }
}

class NotFound extends HttpException {
  constructor(msg = "找不到数据") {
    super();
    this.errorCode = 4004;
    this.msg = msg;
    this.statusCode = 404;
  }
}

module.exports = {
  HttpException: HttpException,
  ParameterException: ParameterException,
  Success,
  Response,
  Forbidden,
};
