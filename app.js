const Koa = require("koa");
const InitManager = require("./core/init");
// const middleware = require("./middleware");
const router = require("koa-router")();
const catchError = require("./middlewares/exception");

const app = new Koa();
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);

  await next();
});

// 跨域设置
router.all("/*", async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Credentials", "true");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, x-requested-with"
  );

  await next();
});

app.use(router.routes()).use(router.allowedMethods());
// 全局错误处理
app.use(catchError);

// 初始化应用
InitManager.initCore(app);

// middleware(app);

app.listen(3001);
console.log("app is running at port 3001...");
