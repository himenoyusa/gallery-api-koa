安装 nodemon： npm i nodemon -g， npm i nodemon -S

//------------------
router.use(function(ctx, next) {
// 重定向到路由名称为 “sign-in” 的页面
ctx.redirect(ctx.router.url("sign-in"));
});

router.get("user", "/users/:id", function(ctx, next) {
// ...
});

router.url("user", 3);
// => 生成路由 "/users/3"

router.url("user", { id: 3 });
// => 生成路由 "/users/3"

// ---------------------------------
router.get(
"/users/:id",
function(ctx, next) {
return User.findOne(ctx.params.id).then(function(user) {
// 首先读取用户的信息，异步操作
ctx.user = user;
next();
});
},
function(ctx) {
console.log(ctx.user);
// 在这个中间件中再对用户信息做一些处理
// => { id: 17, name: "Alex" }
}
);

// ---------------------
var router = new Router({
prefix: '/users' // 添加路由前缀
});

router.get('/', ...); // 匹配路由 "/users"
router.get('/:id', ...); // 匹配路由 "/users/:id"

// -----------------
router.get('/:category/:title', function (ctx, next) {
console.log(ctx.params); // 获取路由参数
// => { category: 'programming', title: 'how-to-node' }
});

//-------------------
const staticFiles = require("koa-static");
const path = require("path");
// 指定 static 文件夹为静态资源目录
app.use(staticFiles(path.resolve(\_\_dirname, "./static")));

# sequelize

---

官方文档的排序使用有误导，正确使用方式：

```js
  order: [["create_time", "DESC]],
```

var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt);
// Store hash in your password DB.

To check a password:

// Load hash from your password DB.
bcrypt.compareSync("B4c0/\/", hash); // true
bcrypt.compareSync("not_bacon", hash); // false

var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("7418035", salt);
var flag1 = bcrypt.compareSync(
"7418035",
"$2b$10\$uRRqcCfg5KdioGZR4olwIemD9yCb1.SyNbbd4JJHA7qSml1OgKJMa"
);
