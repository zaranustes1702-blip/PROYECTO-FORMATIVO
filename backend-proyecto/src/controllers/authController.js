const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const Response  = require("../functions/response");

const JWT_SECRET = process.env.JWT_SECRET || "";


const login = (req, res) => {

    const { userName, password } = req.body;
    
    var errors = [];

    if (userName == "" || password == "") {

        res.status(400);

        const response = new Response(
            "Error en el login",
            null,
            "Usuario y contraseña no tienen info"
        );

        return res.json(response);
    }

    // Generar token
    const token = jwt.sign(
        {
            userName: userName
        },
        JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

    const response = new Response(
        "Login exitoso",
        {
            token: token
        },
        null
    );

    return res.json(response);
};

module.exports = {
    login
};