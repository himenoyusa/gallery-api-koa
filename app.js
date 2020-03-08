const Koa = require("koa");
const app = new Koa();
const router = require("./router");
const middleware = require("./middleware");

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

middleware(app);
router(app);

app.listen(3001);
console.log("app is running at port 3001...");
