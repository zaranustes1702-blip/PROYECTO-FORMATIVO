const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const Response = require("../functions/response");

dotenv.config();

const JWT_KEY_SECRET = process.env.JWT_KEY_SECRET || "";

// Login
const login = (req, res) => {
    const { userName, password } = req.body;

    if (userName == "" || password == "") {
        res.status(400);

        const response = new Response(
            "Error en login",
            null,
            "Usuario o contraseña vacíos"
        );

        return res.json(response);
    }

    const token = jwt.sign(
        {
            user: userName
        },
        JWT_KEY_SECRET,
        {
            expiresIn: "1h"
        }
    );

    const response = new Response(
        "Login successful",
        {
            token
        },
        null
    );

    response.success.ok = true;

    return res.json(response.success);
};

// Recuperar contraseña
const resetPassword = (req, res) => {
    const { email } = req.body;

    if (email == "") {
        res.status(400);

        const response = new Response(
            "Error recuperación contraseña",
            null,
            "El correo es obligatorio"
        );

        return res.json(response);
    }

    const response = new Response(
        "Solicitud de recuperación enviada",
        {
            email
        },
        null
    );

    response.success.ok = true;

    return res.json(response.success);
};

// Validar recuperación de contraseña
const validateResetPassword = (req, res) => {
    const { token } = req.body;

    if (token == "") {
        res.status(400);

        const response = new Response(
            "Error validando recuperación",
            null,
            "Token requerido"
        );

        return res.json(response);
    }

    const response = new Response(
        "Token válido",
        {
            token
        },
        null
    );

    response.success.ok = true;

    return res.json(response.success);
};

// Nueva contraseña
const newPassword = (req, res) => {
    const { password, confirmPassword } = req.body;

    if (password == "" || confirmPassword == "") {
        res.status(400);

        const response = new Response(
            false,
            "Error cambiando contraseña",
            "Las contraseñas son obligatorias"
        );

        return res.json(response.json);
    }

    if (password != confirmPassword) {
        res.status(400);

        const response = new Response(
            false,
            "Error cambiando contraseña",
            "Las contraseñas no coinciden"
        );

        return res.json(response.json);
    }

    const response = new Response(
        true,
        "Contraseña actualizada correctamente",
        null
    );

    return res.json(response.json);
};

module.exports = {
    login,
    resetPassword,
    validateResetPassword,
    newPassword
};