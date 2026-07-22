// src/server.js

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

// Swagger
const swagger = require("./docs/swagger");

// Conexión DB
const db = require("./config/conectionDB");

// Rutas
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const barnRoute = require("./routes/barnRoute");
const birdBatchRoute = require("./routes/birdBatchRoute");
const supplyRoute = require("./routes/supplyRoute");
const feedingRoute = require("./routes/feedingRoute");
const eggProductionRoute = require("./routes/eggProductionRoute");
const mortalityRoute = require("./routes/mortalityRoute");
const responsibleRoute = require("./routes/responsibleRoute");
const weighingRoute = require("./routes/weighingRoute");
const visitRoute = require("./routes/visitRoute");
const healthRoute = require("./routes/healthRoute");
const quarantineRoute = require("./routes/quarantineRoute");

// Middlewares
const limiter = require("./middlewares/rateLimit");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(limiter);

// Swagger
app.use("/api-docs", swagger);

// Ruta principal
app.get("/", (req, res) => {
    res.json({
        message: "Bienvenido a la API de Avicultura"
    });
});

// Rutas API
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/barns", barnRoute);
app.use("/api/bird-batches", birdBatchRoute);
app.use("/api/supplies", supplyRoute);
app.use("/api/feedings", feedingRoute);
app.use("/api/egg-productions", eggProductionRoute);
app.use("/api/mortalities", mortalityRoute);
app.use("/api/responsibles", responsibleRoute);
app.use("/api/weighings", weighingRoute);
app.use("/api/visits", visitRoute);
app.use("/api/health", healthRoute);
app.use("/api/quarantines", quarantineRoute);

// Ruta no encontrada
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

// Manejo de errores
app.use(errorHandler);

// Inicializar servidor
const init = async () => {
    try {
        await db.authenticate();

        console.log("Conexión a la base de datos establecida correctamente.");

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });

    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
};

init();