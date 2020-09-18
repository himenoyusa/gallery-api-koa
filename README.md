# 图片仓库后台 api （重构）

使用 koa2 构建的图片展示网页后端 api

## 技术栈

> koa2 + MySQL + PM2 + swagger

## 安装方法

1. 使用 `npm install` 进行安装
1. 使用 `mysql -u user -p < init.sql` 创建数据库
1. 复制 `.env.example` 为 `.env`，并修改数据库登录参数、jwt 加密密钥
1. 使用 PM2 运行 `/app/index.js`
1. 查看接口文档：`${origin}/docs`
   - swagger 接口文档 url 设置位于 `/app/swagger.conf.js` 及 `/app/routes/docs.js`
