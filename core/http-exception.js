class HttpException extends Error {
  constructor(msg = "", data = {}, errorCode = 2000, statusCode = 200) {
    super();
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.data = data;
    this.msg = msg;
  }
}

class ParameterException extends HttpException {
  constructor(msg = "", errorCode = 4000) {
    super();
    this.errorCode = errorCode;
    this.statusCode = 400;
    this.msg = msg || "参数错误";
  }
}

class Success extends HttpException {
  constructor(msg = "操作成功", statusCode = 200) {
    super();
    this.errorCode = 2000;
    this.statusCode = statusCode;
    this.msg = msg;
  }
}

class Response extends HttpException {
  constructor(data = {}) {
    super();
    if (!data) {
      throw new Forbidden("找不到数据", 404);
    }
    this.data = data;
    this.statusCode = 200;
  }
}

class Forbidden extends HttpException {
  constructor(msg = "禁止访问", statusCode = 403) {
    super();
    this.msg = msg;
    this.statusCode = statusCode;
  }
}

module.exports = {
  HttpException: HttpException,
  ParameterException: ParameterException,
  Success,
  Response,
  Forbidden
};
