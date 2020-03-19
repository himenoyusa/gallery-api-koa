const {
  LinValidator,
  Rule
} = require(`${process.cwd()}/core/lin-validator-v2`);

const { LoginType } = require(`${process.cwd()}/app/lib/enum.js`);

class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super();
    this.id = [new Rule("isInt", "需要是整数", { min: 1 })];
  }
}

class RegisterValidator extends LinValidator {
  constructor() {
    super();
    this.email = [new Rule("isEmail", "请填写正确的 Email")];
    this.password1 = [
      new Rule("isLength", "密码长度在 6 到 32 位之间", { min: 6, max: 32 })
    ];
    this.password2 = this.password1;
    this.nickname = [
      new Rule("isLength", "昵称长度在 6 到 32 位之间", { min: 2, max: 32 })
    ];
  }

  validatePassword(vals) {
    const pw1 = vals.body.password1;
    const pw2 = vals.body.password2;
    if (pw1 !== pw2) {
      throw new Error("两次输入的密码不一致");
    }
  }
}

class TokenValidator extends LinValidator {
  constructor() {
    super();
    this.account = [new Rule("isLength", "账号长度有误", { min: 4, max: 32 })];
    this.secret = [
      new Rule("isOptional"),
      new Rule("isLength", "密码长度有误", { min: 6, max: 128 })
    ];
    this.type = []; // 登录方式
  }

  validateLoginType(vals) {
    if (!vals.body.type) {
      throw new Error("type 是必须参数");
    }
    if (!LoginType.isThisType(vals.body.type)) {
      throw new Error("type不合法");
    }
  }
}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator
};
