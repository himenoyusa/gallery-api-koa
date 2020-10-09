const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  info: {
    title: "gallery",
    version: "2.0.0",
    description: "gallery 网站后台 koa api",
  },
  host: process.env.domain.split("//")[1],
  basePath: "/",
};

const options = {
  swaggerDefinition,
  apis: ["./app/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
