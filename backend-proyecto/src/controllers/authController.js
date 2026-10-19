const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

const Response = require("../functions/response");
const { getEmailUser } = require("../services/userServices");

dotenv.config();

const JWT_KEY_SECRET = process.env.JWT_KEY_SECRET || "1234";

// Inicio de sesión
// Response(success, message, info)  -> success: true/false, message: texto, info: datos
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const response = new Response(false, "Correo o contraseña vacíos", null);
      return res.status(400).json(response.json);
    }

    const user = await getEmailUser(email);

    // Si no existe el usuario
    if (!user) {
      const response = new Response(false, "Usuario o contraseña incorrectos", null);
      return res.status(400).json(response.json);
    }

    // Comparar contraseña (la BD debe guardar el hash bcrypt)
    const match = bcrypt.compareSync(password, user.password);

    if (!match) {
      const response = new Response(false, "Usuario o contraseña incorrectos", null);
      return res.status(400).json(response.json);
    }

    // Generar token SOLO si la contraseña es correcta
    const token = jwt.sign(
      { id: user.userId, user: email },
      JWT_KEY_SECRET,
      { expiresIn: "1h" },
    );

    // El frontend lee data.success y data.info.token
    const response = new Response(true, "Login exitoso", { token });
    return res.status(200).json(response.json);
  } catch (error) {
    console.error("Error en login:", error);
    const response = new Response(false, "Error interno del servidor", [
      { message: error.message || "Ocurrió un error inesperado" },
    ]);
    return res.status(500).json(response.json);
  }
};

// recuperar contraseña
const resetPassword = (req, res) => {
  const { email } = req.body;
  if (!email) {
    const response = new Response(false, "El correo es obligatorio", null);
    return res.status(400).json(response.json);
  }
  const response = new Response(true, "Solicitud de recuperación enviada", { email });
  return res.json(response.json);
};

// validar recuperación de contraseña
const validateResetPassword = (req, res) => {
  const { token } = req.body;
  if (!token) {
    const response = new Response(false, "Token requerido", null);
    return res.status(400).json(response.json);
  }
  const response = new Response(true, "Token válido", { token });
  return res.json(response.json);
};

// nueva contraseña
const newPassword = (req, res) => {
  const { password, confirmPassword } = req.body;

  if (!password || !confirmPassword) {
    const response = new Response(false, "Las contraseñas son obligatorias", null);
    return res.status(400).json(response.json);
  }

  if (password !== confirmPassword) {
    const response = new Response(false, "Las contraseñas no coinciden", null);
    return res.status(400).json(response.json);
  }

  // Aquí va la lógica para actualizar la contraseña en la base de datos
  const response = new Response(true, "Contraseña actualizada correctamente", null);
  return res.json(response.json);
};

module.exports = {
  login,
  resetPassword,
  validateResetPassword,
  newPassword,
};
