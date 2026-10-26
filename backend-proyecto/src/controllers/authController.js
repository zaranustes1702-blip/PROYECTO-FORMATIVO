const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");

const Response = require("../functions/response");
const {sendEmail} = require("../services/emailServices");
const { getEmailUser, UserUpdateEmail, getUserByUUID } = require("../services/userServices");

dotenv.config();

const JWT_KEY_SECRET = process.env.JWT_KEY_SECRET || "1234";

// Inicio de sesión
// Response(success, message, info) -> success: true/false, message: texto, info: datos
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

// Recuperar contraseña
const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || email.trim() === "") {
      const response = new Response(
        false,
        "Error recuperación contraseña",
        "El usuario no contiene información",
      );
      return res.status(400).json(response.json);
    }

    const user = await getEmailUser(email);

    if (!user) {
      const response = new Response(
        false,
        "Usuario no encontrado",
        "El correo proporcionado no está registrado",
      );
      return res.status(400).json(response.json);
    }

    const token = Buffer.from(user.uuid).toString("base64");

    let data = {
      resetPasswordToken: token,
      solicito_newPassword: true,
    };

    await UserUpdateEmail(user.email, data);

    const routeJson = path.join(
      process.cwd(),
      "public",
      "plantillas",
      "resetPassword.json",
    );

    const dataTemplate = JSON.parse(fs.readFileSync(routeJson, "utf8"));

    // Leer el HTML de la plantilla
    const routeHtml = path.join(
      process.cwd(),
      "public",
      "plantillas",
      "html",
      "resetPassword.html",
    );

    let htmlModified = fs.readFileSync(routeHtml, "utf8");

    // El link lleva el token al final
    const link = dataTemplate.params["@link"].replace("<TOKEN>", token);

    // Reemplazar las variables en el HTML (@variable)
    htmlModified = htmlModified.replace(/@link/g, link);
    htmlModified = htmlModified.replace(/@nameBtn/g, dataTemplate.params["@nameBtn"]);
    htmlModified = htmlModified.replace(/@cuentaEmpresa/g, dataTemplate.params["@cuentaEmpresa"]);
    // @name viene del usuario en la BD, no del JSON
    htmlModified = htmlModified.replace(/@name/g, user.name);

    // Enviar el correo
    await sendEmail(
      email,
      dataTemplate.subject,
      "Recuperación de contraseña - EggBalance",
      htmlModified,
    );

    const responseToken = new Response(
      true,
      "Correo de recuperación enviado correctamente",
      null,
    );

    return res.status(200).json(responseToken.json);

  } catch (error) {
    console.error("Error en resetPassword:", error);

    const response = new Response(
      false,
      "Error al recuperar la contraseña",
      null,
    );

    return res.status(500).json(response.json);
  }
};


// Validar token de recuperación de contraseña
const validateResetPassword = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      const response = new Response(false, "Token no proporcionado", null);
      return res.status(400).json(response.json);
    }

    const uuid = Buffer.from(token, "base64").toString("utf8");

    const user = await getUserByUUID(uuid);

    if (!user) {
      const response = new Response(false, "Token inválido", null);
      return res.status(400).json(response.json);
    }

    if (!user.solicito_newPassword) {
      const response = new Response(false, "El enlace ya fue usado o no es válido", null);
      return res.status(400).json(response.json);
    }

    if (user.resetPasswordToken !== token) {
      const response = new Response(false, "Token inválido", null);
      return res.status(400).json(response.json);
    }

    const response = new Response(true, "Token válido", null);
    return res.status(200).json(response.json);

  } catch (error) {
    console.error("Error en validateResetPassword:", error);
    const response = new Response(false, "Error interno del servidor", null);
    return res.status(500).json(response.json);
  }
};

// Guardar nueva contraseña
const newPassword = async (req, res) => {
  try {
    const { token, password, confirmPassword } = req.body;

    if (!token || !password || !confirmPassword) {
      const response = new Response(false, "Datos incompletos", null);
      return res.status(400).json(response.json);
    }

    if (password !== confirmPassword) {
      const response = new Response(false, "Las contraseñas no coinciden", null);
      return res.status(400).json(response.json);
    }

    const uuid = Buffer.from(token, "base64").toString("utf8");

    const user = await getUserByUUID(uuid);

    if (!user) {
      const response = new Response(false, "Token inválido", null);
      return res.status(400).json(response.json);
    }

    if (!user.solicito_newPassword || user.resetPasswordToken !== token) {
      const response = new Response(false, "El enlace ya fue usado o no es válido", null);
      return res.status(400).json(response.json);
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Actualizamos la contraseña y limpiamos el token y el estado
    await UserUpdateEmail(user.email, {
      password: passwordHash,
      salt,
      resetPasswordToken: null,
      solicito_newPassword: false,
    });

    const response = new Response(true, "Contraseña actualizada correctamente", null);
    return res.status(200).json(response.json);

  } catch (error) {
    console.error("Error en newPassword:", error);
    const response = new Response(false, "Error interno del servidor", null);
    return res.status(500).json(response.json);
  }
};

// Recibir mensaje del formulario de contacto
const contact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      const response = new Response(false, "Nombre, correo y mensaje son obligatorios", null);
      return res.status(400).json(response.json);
    }

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:30px;border:1px solid #e0e0e0;border-radius:12px">
        <h2 style="color:#2E7D32">Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subject || 'Sin asunto'}</p>
        <hr style="border:none;border-top:1px solid #e0e0e0;margin:20px 0">
        <p><strong>Mensaje:</strong></p>
        <p style="white-space:pre-wrap;color:#555">${message}</p>
      </div>
    `;

    await sendEmail(
      process.env.SMTP_USER,
      subject ? `[Contacto] ${subject}` : `[Contacto] Mensaje de ${name}`,
      `Mensaje de ${name} (${email}): ${message}`,
      html,
    );

    const response = new Response(true, "Mensaje enviado correctamente", null);
    return res.status(200).json(response.json);

  } catch (error) {
    console.error("Error en contact:", error);
    const response = new Response(false, "Error al enviar el mensaje", null);
    return res.status(500).json(response.json);
  }
};

module.exports = {
  login,
  resetPassword,
  validateResetPassword,
  newPassword,
  contact,
};