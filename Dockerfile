FROM node:12-alpine
# 声明作者
MAINTAINER yusa
# cd 到 /srv/
WORKDIR /app/
# 安装依赖
RUN npm i pm2 -g
RUN npm i
# 对外暴露的端口
EXPOSE 3001
# 程序启动脚本
CMD ["npm", "run", "start"]
