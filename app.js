const Koa = require("koa");
const InitManager = require("./core/init");
const middleware = require("./middleware");
const router = require("koa-router")();
const catchError = require("./middlewares/exception");

const app = new Koa();
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

router.all("/*", async (ctx, next) => {
  // *代表允许来自所有域名请求
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Credentials", "true");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, x-requested-with"
  );
  // 其他一些设置...
  await next();
});

app.use(catchError);

app.use(router.routes()).use(router.allowedMethods());

InitManager.initCore(app);

// middleware(app);

app.listen(3001);
console.log("app is running at port 3001...");
