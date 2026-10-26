
const { randomUUID } = require("crypto");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// Buscar usuario por correo
const getEmailUser = async (email) => {
  return await User.findOne({
    where: { email },
  });
};

// Registrar usuario
const createUser = async (data) => {
  const { name, email, documentId, postJob, password, id_roll } = data;

  if (!name || !email || !documentId || !postJob || !password) {
    throw new Error("Todos los campos son obligatorios");
  }

  const correo = email.trim().toLowerCase();
  const existe = await User.findOne({ where: { email: correo } });

  if (existe) {
    throw new Error("El correo ya está registrado");
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  // Generar UUID
  const uuid = randomUUID();

  const nuevoUsuario = await User.create({
    name,
    uuid, // Aquí se guarda el UUID generado
    email: correo,
    documentId,
    postJob,
    password: passwordHash,
    salt,
    id_roll: id_roll ?? null,
    verifyEmail: false,
    active: true,
  });

  console.log("Usuario registrado:", nuevoUsuario.userId);
  console.log("UUID generado:", nuevoUsuario.uuid);

  return nuevoUsuario;
};

// Obtener todos los usuarios
const getAllUsers = async (limit = 10, offset = 0) => {
  return await User.findAll({
    attributes: { exclude: ["password", "salt", "resetPasswordToken"] },
    limit,
    offset,
    order: [["userId", "DESC"]],
  });
};

// Buscar usuario por ID
const getUserById = async (id) => {
  return await User.findByPk(id, {
    attributes: { exclude: ["password", "salt", "resetPasswordToken"] },
  });
};

// Registrar usuario desde el controlador
const userCreate = async (data) => {
  const uuid = randomUUID();

  return await User.create({
    ...data,
    uuid,
  });
};

// Actualizar usuario por ID
const UserUpdate = async (id, data) => {
  const [updated] = await User.update(data, {
    where: { userId: id },
  });

  if (!updated) {
    throw new Error("No se encontró el usuario para actualizar");
  }

  return await getUserById(id);
};

// Actualizar usuario por correo
const UserUpdateEmail = async (email, data) => {
  const [updated] = await User.update(data, {
    where: { email },
  });

  return updated;
};

// Consultar usuario por UUID
const getUserByUUID = async (uuid) => {
  return await User.findOne({
    where: { uuid },
  });
};

// Eliminar usuario
const userDelete = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error("El usuario no existe");
  }

  await user.destroy();

  return user.userId;
};

module.exports = {
  getEmailUser,
  createUser,
  getAllUsers,
  getUserById,
  userCreate,
  UserUpdate,
  UserUpdateEmail,
  getUserByUUID,
  userDelete,
};
