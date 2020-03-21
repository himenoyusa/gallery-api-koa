class HttpException extends Error {
  constructor(msg = "", errorCode = 2000, statusCode = 200) {
    super();
    this.errorCode = errorCode;
    this.statusCode = statusCode;
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
  constructor(msg = "", statusCode = 200) {
    super();
    this.errorCode = 2000;
    this.statusCode = statusCode;
    this.msg = msg || "操作成功";
  }
}

module.exports = {
  HttpException: HttpException,
  ParameterException: ParameterException,
  Success
};
