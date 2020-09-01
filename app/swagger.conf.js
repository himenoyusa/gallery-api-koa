const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  info: {
    title: "gallery",
    version: "1.0.0",
    description: "gallery 网站后台 koa api",
  },
  host: `localhost:3001`,
  basePath: "/",
};

const options = {
  swaggerDefinition,
  apis: ["./app/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;