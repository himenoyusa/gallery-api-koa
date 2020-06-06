var config = {
  database: {
    database: "test",
    username: "user",
    password: "password",
    host: "localhost",
    port: 3306,
  },
  environment: "dev", // or prod
  secretKey: "123456",
  hostname: "https://localhost:3000/",
  picture_dir: "https://localhost:3000/picture/",
};

module.exports = config;
