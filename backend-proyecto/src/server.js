// src/server.js
const cors = require ("cors");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { sendEmail } = require("./services/emailServices");
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
app.use(cors());
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

        console.log(
            "Conexión a la base de datos establecida correctamente."
        );


        // // ======================================
        // // PRUEBA 1: CORREO DE BIENVENIDA
        // // ======================================

        // await sendEmail(
        //     "eggbalance857@gmail.com",

        //     "Bienvenido a EggBalanceApp",

        //     "Tu cuenta fue creada correctamente.",

        //     `
        //         <h1>Bienvenido a EggBalanceApp</h1>

        //         <p>
        //             Hola, bienvenido a nuestra plataforma.
        //         </p>

        //         <p>
        //             Tu cuenta fue creada correctamente.
        //         </p>

        //         <p>
        //             Fecha de envío:
        //             ${new Date().toLocaleDateString()}
        //         </p>

        //         <hr>

        //         <footer>
        //             EggBalanceApp - Sistema de gestión avícola
        //         </footer>
        //     `
        // );

        // console.log(
        //     "Prueba 1: Correo de bienvenida enviado correctamente."
        // );


        // ======================================
        // INICIAR SERVIDOR
        // ======================================

        app.listen(PORT, () => {

            console.log(
                `Servidor corriendo en el puerto ${PORT}`
            );

        });

    } catch (error) {

        console.error(
            "Error en la aplicación:",
            error.message
        );

    }
};

init();