const user = require("../models/userModel");

// 1. Obtener usuario por Email (Para Login)
const getEmailUser = async (email) => {
  try {
    const userEmail = await user.findOne({ where: { email } });
    return userEmail;
  } catch (error) {
    console.error("Error en getEmailUser:", error);
    throw error;
  }
};

// 2. Crear usuario
const userCreate = async (data) => {
  try {
    const newUser = await user.create(data);
    return newUser;
  } catch (error) {
    console.error("Error en userCreate:", error);
    throw error;
  }
};

// 3. Obtener todos los usuarios
const getAllUsers = async (limit, offset) => {
  try {
    const users = await user.findAll({ offset: offset, limit: limit });
    return users;
  } catch (error) {
    console.error("Error en getAllUsers:", error);
    throw error;
  }
};

// 4. Obtener usuario por ID (userId)
const getUserById = async (id) => {
  try {
    const userid = await user.findOne({
      where: { userId: id },
    });
    return userid;
  } catch (error) {
    console.error("Error en getUserById:", error);
    throw error;
  }
};

// 5. Eliminar usuario (userId)
const userDelete = async (id) => {
  try {
    const deleted = await user.destroy({
      where: { userId: id },
    });
    return deleted;
  } catch (error) {
    console.error("Error en userDelete:", error);
    throw error;
  }
};

// 6. Actualizar usuario (userId)
const UserUpdate = async (id, data) => {
  try {
    const updated = await user.update(data, {
      where: { userId: id },
    });
    return updated;
  } catch (error) {
    console.error("Error en UserUpdate:", error);
    throw error;
  }
};

module.exports = {
  getEmailUser,
  userCreate,
  getAllUsers,
  getUserById,
  userDelete,
  UserUpdate,
};