const Sequelize = require("sequelize");
const { database, username, password, host } = global.config.database;

var sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  }
});

module.exports = sequelize;
