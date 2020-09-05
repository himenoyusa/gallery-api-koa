const Koa = require("koa");
const app = new Koa();
const body = require("koa-body");
const error = require("koa-json-error");
const parameter = require("koa-parameter");
// const mongoose = require("mongoose");
const static = require("koa-static");
const swagger = require("koa2-swagger-ui");
const path = require("path");
const routing = require("./routes");

// 加载环境变量
require("dotenv").config();

// 允许跨域
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  );
  ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  if (ctx.method == "OPTIONS") {
    ctx.body = 200;
  } else {
    await next();
  }
});

// 开启静态服务
app.use(
  swagger({
    routePrefix: "/docs",
    swaggerOptions: {
      url: "http://localhost:3001/swaggerDoc",
    },
  })
);
app.use(static(path.join(__dirname, "public")));

// 连接 mongoDB 数据库
// mongoose.connect(
//   process.env.connectionString,
//   {
//     auth: { user: process.env.user, password: process.env.password },
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   (err) => console.log("mongoDB 连接成功", err)
// );

// 错误处理
app.use(
  error({
    postFormat: (err, { stack, ...rest }) =>
      process.env.NODE_ENV === "production" ? rest : { stack, ...rest },
  })
);

// 请求参数及文件获取
app.use(
  body({
    multipart: true,
    formidable: {
      maxFileSize: 2000 * 1024 * 1024,
      uploadDir: path.join(__dirname, "/public/pictures"),
      keepExtensions: true,
    },
  })
);

// 参数校验
app.use(parameter(app));

// 路由绑定
routing(app);

app.listen(3001, () => {
  console.log("App running at 3001 port");
});
