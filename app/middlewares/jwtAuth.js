const jwt = require("koa-jwt");

const secret = process.env.secret;
const auth = jwt({ secret });

module.exports = auth;
