# HTTP options 方法的作用

1. 检测服务器所支持的请求方法
1. CORS 中的预检请求

## allowedMethods 方法的作用

1. 响应 options 方法，返回服务器所支持的方法
1. 相应地返回 405 和 501

mongodb+srv://yusa:<password>@gallery.8gce6.mongodb.net/<dbname>?retryWrites=true&w=majority

mongodb 安装按照官网步骤
登录后，先在 users 库中创建超级管理员用户 admin
修改 mongod.conf，添加 authorization enabled，重启 mongod
bindIp 修改成 0.0.0.0 才能允许远程访问
然后进入 mongo，验证身份 use admin，， db.auth("admin","123456")
use gallery，创建库用户 yusa
使用新用户登录 mongo 127.0.0.1/gallery -u yusa -p

用户资料结构
{
avatar_url
name
gender:{type: String, enum: ['male', 'female', 'unknown'], default: 'unknown'}
headline 一句话介绍
locations 居住地
business 行业

}
