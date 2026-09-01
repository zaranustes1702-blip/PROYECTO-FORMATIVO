const {
  getAllUsers,
  getUserById,
  userCreate,
  UserUpdate,
  userDelete,
} = require("../services/userServices");

const { sendEmail } = require("../services/emailServices");
const Response = require("../functions/response");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  try {
    const querylimit = req.query.limit;
    const queryoffset = req.query.offset;
    const limit = querylimit ? parseInt(querylimit) : 10;
    const offset = queryoffset ? parseInt(queryoffset) : 0;
    const users = await getAllUsers(limit, offset);

    const response = new Response(
      true,
      "Usuarios obtenidos exitosamente",
      users
    );

    return res.status(200).json(response.json || response);
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);

    const errorResponse = new Response(false, "Error interno del servidor", [
      { message: error.message || "Ocurrió un error inesperado" },
    ]);

    return res.status(500).json(errorResponse.json || errorResponse);
  }
};

const getAllUsersById = async (req, res) => {
  try {
    const { id } = req.params;

    let errors = [];

    if (!id) {
      errors.push("El ID del usuario es obligatorio");
    }

    if (errors.length > 0) {
      const response = new Response(
        false,
        "Error al obtener el usuario",
        errors
      );

      return res.status(400).json(response.json || response);
    }

    const userFound = await getUserById(id);

    if (!userFound) {
      const response = new Response(false, "El usuario no existe", []);
      return res.status(404).json(response.json || response);
    }

    const response = new Response(true, "Usuario obtenido exitosamente", userFound);
    return res.status(200).json(response.json || response);
  } catch (error) {
    console.error("Error al buscar por ID:", error);

    const response = new Response(false, "Error interno del servidor", [
      { message: error.message },
    ]);

    return res.status(500).json(response.json || response);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, documentId, postJob, idroll } = req.body;

    let errors = [];

    if (!name || name.trim() === "") {
      errors.push("El nombre del usuario es obligatorio");
    }

    if (!email || email.trim() === "") {
      errors.push("El correo del usuario es obligatorio");
    }

    if (!password || password.trim() === "") {
      errors.push("La contraseña del usuario es obligatoria");
    }

    if (!documentId || documentId.toString().trim() === "") {
      errors.push("El documento es obligatorio");
    }

    if (!postJob || postJob.trim() === "") {
      errors.push("El cargo es obligatorio");
    }

    if (errors.length > 0) {
      const response = new Response(false, "Error al crear el usuario", errors);
      return res.status(400).json(response.json || response);
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const data = {
      name,
      email,
      password: hashedPassword,
      salt,
      documentId,
      postJob,
      idroll: idroll || null,
      active: true,
      verifyEmail: false,
    };

    const newUser = await userCreate(data);

    // Envio de correo con resolución de ruta segura
    try {
      const templatePath = path.join(
        process.cwd(),
        "public",
        "plantillas",
        "confirmEmail.json"
      );

      if (fs.existsSync(templatePath)) {
        const confirmEmailTemplate = fs.readFileSync(templatePath, "utf-8");
        const dataTemplate = JSON.parse(confirmEmailTemplate);

        const htmlPath = path.isAbsolute(dataTemplate.html)
          ? dataTemplate.html
          : path.join(process.cwd(), "public", "plantillas", dataTemplate.html);

        let htmlModific = fs.readFileSync(htmlPath, "utf-8");

        for (const key in dataTemplate.params) {
          htmlModific = htmlModific.replaceAll(key, dataTemplate.params[key]);
        }

        await sendEmail(email, dataTemplate.subject, "", htmlModific);
      }
    } catch (mailErr) {
      console.warn("Aviso: No se pudo enviar el correo de plantilla:", mailErr.message);
    }

    const response = new Response(true, "Usuario creado exitosamente", newUser);
    return res.status(201).json(response.json || response);
  } catch (error) {
    console.error("Error al crear usuario:", error);

    const response = new Response(false, "Error interno del servidor", [
      { message: error.message },
    ]);

    return res.status(500).json(response.json || response);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, documentId, postJob } = req.body;

    let errors = [];

    if (!id) {
      errors.push("El ID es obligatorio");
    }

    if (!name || name.trim() === "") {
      errors.push("El nombre es obligatorio");
    }

    if (!email || email.trim() === "") {
      errors.push("El correo es obligatorio");
    }

    if (!documentId || documentId.toString().trim() === "") {
      errors.push("El documento es obligatorio");
    }

    if (!postJob || postJob.trim() === "") {
      errors.push("El cargo es obligatorio");
    }

    if (errors.length > 0) {
      const response = new Response(
        false,
        "Error al actualizar el usuario",
        errors
      );
      return res.status(400).json(response.json || response);
    }

    const data = {
      name,
      email,
      documentId,
      postJob,
    };

    if (password && password.trim() !== "") {
      const salt = bcrypt.genSaltSync(10);
      data.password = bcrypt.hashSync(password, salt);
      data.salt = salt;
    }

    const userUpdated = await UserUpdate(id, data);

    const response = new Response(
      true,
      "Usuario actualizado exitosamente",
      userUpdated
    );

    return res.status(200).json(response.json || response);
  } catch (error) {
    console.error("Error al actualizar usuario:", error);

    const response = new Response(false, "Error interno del servidor", [
      { message: error.message },
    ]);

    return res.status(500).json(response.json || response);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      const response = new Response(
        false,
        "Error al eliminar el usuario",
        ["El ID es obligatorio"]
      );
      return res.status(400).json(response.json || response);
    }

    const userDel = await userDelete(id);

    const response = new Response(true, "Usuario eliminado exitosamente", userDel);
    return res.status(200).json(response.json || response);
  } catch (error) {
    console.error("Error al eliminar usuario:", error);

    const response = new Response(false, "Error interno del servidor", [
      { message: error.message },
    ]);

    return res.status(500).json(response.json || response);
  }
};

module.exports = {
  getUsers,
  getAllUsersById,
  createUser,
  updateUser,
  deleteUser,
};