const Sequelize = require("sequelize");
const { database, user, password, host } = process.env;

var maria = new Sequelize(database, user, password, {
  host: host,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 30000,
  },
  define: {
    freezeTableName: true, //禁止自动修改表名
    timestamps: true,
    updatedAt: "updated_at",
    createdAt: "created_at",
  },
});

module.exports = maria;
