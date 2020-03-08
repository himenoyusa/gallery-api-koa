const Sequelize = require("sequelize");
const config = require("../config");

var sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 30000
    }
  }
);

var Picture = sequelize.define(
  "picture",
  {
    picture_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    picture_dir: Sequelize.STRING,
    thumb_dir: Sequelize.STRING,
    total_score: Sequelize.INTEGER,
    create_by: Sequelize.INTEGER,
    create_time: Sequelize.INTEGER,
    edit_by: Sequelize.INTEGER,
    edit_time: Sequelize.INTEGER,
    r18: Sequelize.BOOLEAN
  },
  {
    timestamps: false
  }
);

module.exports = {
  get: async pid => {
    var picture = await Picture.findAll({
      where: {
        picture_id: 1
      }
    });
    for (let p of picture) {
      console.log(JSON.stringify(p));
      return p;
    }
  }
};
