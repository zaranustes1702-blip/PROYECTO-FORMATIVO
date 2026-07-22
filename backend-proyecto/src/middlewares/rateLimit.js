const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 60 * 1000, 
    max: 30,
    message:{
        success: false,
        message: "Demasiadas solicitudes. Intente nuevamente en un minuto."
    } 
});

module.exports = limiter;