// src/middlewares/authMiddleware.js

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    console.log("Authorization Header:", authHeader);

    if (!authHeader) {

        return res.status(401).json({
            message: "Token requerido"
        });

    }

    const token = authHeader.split(" ")[1];

    console.log("Token recibido:", token);

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("Token decodificado:", decoded);

        req.user = decoded;

        next();

    } catch (error) {

        console.log("Error JWT:", error);

        return res.status(401).json({
            message: "Token inválido",
            error: error.message
        });

    }

};

module.exports = verifyToken;