const express = require("express");
const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const PORT = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "API Avicultura",
      version: "1.0.0",
      description: "Documentación de la API",
    },

    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],

    basePath: "/api",

    // Authorization Swagger
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  // Rutas documentadas
  apis: [
    "./src/routes/userRoute.js",
    "./src/routes/authRoute.js",
    "./src/routes/weighingRoute.js",
    "./src/routes/supplyRoute.js",
    "./src/routes/feedingRoute.js",
    "./src/routes/mortalityRoute.js",
    "./src/routes/responsibleRoute.js",
    "./src/routes/eggProductionRoute.js",
    "./src/routes/birdBatchRoute.js",
    "./src/routes/visitRoute.js",
    "./src/routes/healthRoute.js",
    "./src/routes/quarantineRoute.js",
    "./src/routes/barnRoute.js"
  ],
};

const swaggerSpecs = swaggerJsdoc(options);

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

module.exports = app;