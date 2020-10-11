# 图片仓库后台 api （重构）

使用 koa2 构建的图片展示网页后端 api，包括基本的图片上传、评论、收藏、评分等功能，用户登录使用 jwt 验证

## 技术栈

> koa2 + MySQL + swagger

## 安装方法

1. 使用 `npm install` 进行安装
1. 使用 `mysql -u user -p < init.sql` 创建数据库，为数据库用户赋权
1. 复制 `.env.example` 为 `.env`，并修改数据库登录参数、jwt 加密密钥
1. 在 app 目录下新建 `/public/pictures/thumbs`、 `/public/avatars` 文件夹用作图片存储
1. 使用 PM2 运行 `/app/index.js`
1. 查看接口文档：`${origin}/api/docs`
   - swagger 接口文档 url 设置位于 `/app/swagger.conf.js` 及 `/app/routes/docs.js`
