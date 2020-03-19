isThisType = val => {
  for (let key in this) {
    if (this[key] == val) {
      return true;
    }
  }
  return false;
};

// 登录方式
const LoginType = {
  USER_EMAIL: 100,
  USER_ACCOUNT: 101,
  ADMIN_ACCOUNT: 200,
  isThisType
};

module.exports = { LoginType };
