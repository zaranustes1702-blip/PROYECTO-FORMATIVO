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

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    const response = new Response(
      true,
      "Usuarios obtenidos exitosamente",
      users,
    );

    res.status(200);
    res.json(response.json);
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);

    const errorResponse = new Response(false, "Error interno del servidor", [
      { message: error.message || "Ocurrió un error inesperado" },
    ]);

    res.status(500);
    res.json(errorResponse.json);
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
        errors,
      );

      return res.status(400).json(response.json);
    }

    const user = await getUserById(id);

    if (!user) {
      const response = new Response(false, "El usuario no existe", []);

      return res.status(404).json(response.json);
    }

    const response = new Response(true, "Usuario obtenido exitosamente", user);

    res.status(200);
    res.json(response.json);
  } catch (error) {
    console.error(error);

    const response = new Response(false, "Error interno del servidor", [
      { message: error.message },
    ]);

    res.status(500).json(response.json);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, documentId, postJob } = req.body;

    let errors = [];

    if (!name || name.trim() === "") {
      errors.push("El nombre del usuario es obligatorio");
    }

    if (!email || email.trim() === "") {
      errors.push("El correo del usuario es obligatorio");
    }

    if (!documentId || documentId.trim() === "") {
      errors.push("El documento es obligatorio");
    }

    if (!postJob || postJob.trim() === "") {
      errors.push("El cargo es obligatorio");
    }

    if (errors.length > 0) {
      const response = new Response(false, "Error al crear el usuario", errors);

      return res.status(400).json(response.json);
    }

    const data = {
      name,
      email,
      documentId,
      postJob,
    };

    const user = await userCreate(data);
    let templatePath = path.join(
      process.cwd(),
      "public",
      "plantillas",
      "confirmEmail.json",
    );

    const confirmEmailTemplate = fs.readFileSync(templatePath);
    const dataTemplate = JSON.parse(confirmEmailTemplate);

    const templateHtml = fs.readFileSync(dataTemplate.html);

    let htmlModific = templateHtml.toString();

    for (const key in dataTemplate.params) {
      htmlModific = htmlModific.replaceAll(key, dataTemplate.params[key]);
    }

    await sendEmail(email, dataTemplate.subject, "", htmlModific);

    const response = new Response(true, "Usuario creado exitosamente", user);

    res.status(201);
    res.json(response.json);
  } catch (error) {
    console.error(error);

    const response = new Response(false, "Error interno del servidor", [
      { message: error.message },
    ]);

    res.status(500).json(response.json);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, email, documentId, postJob } = req.body;

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

    if (!documentId || documentId.trim() === "") {
      errors.push("El documento es obligatorio");
    }

    if (!postJob || postJob.trim() === "") {
      errors.push("El cargo es obligatorio");
    }

    if (errors.length > 0) {
      const response = new Response(
        false,
        "Error al actualizar el usuario",
        errors,
      );

      return res.status(400).json(response.json);
    }

    const data = {
      name,
      email,
      documentId,
      postJob,
    };

    const user = await UserUpdate(id, data);

    const response = new Response(
      true,
      "Usuario actualizado exitosamente",
      user,
    );

    res.status(200);
    res.json(response.json);
  } catch (error) {
    console.error(error);

    const response = new Response(false, "Error interno del servidor", [
      { message: error.message },
    ]);

    res.status(500).json(response.json);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    let errors = [];

    if (!id) {
      errors.push("El ID es obligatorio");
    }

    if (errors.length > 0) {
      const response = new Response(
        false,
        "Error al eliminar el usuario",
        errors,
      );

      return res.status(400).json(response.json);
    }

    const user = await userDelete(id);

    const response = new Response(true, "Usuario eliminado exitosamente", user);

    res.status(200);
    res.json(response.json);
  } catch (error) {
    console.error(error);

    const response = new Response(false, "Error interno del servidor", [
      { message: error.message },
    ]);

    res.status(500).json(response.json);
  }
};

module.exports = {
  getUsers,
  getAllUsersById,
  createUser,
  updateUser,
  deleteUser,
};
