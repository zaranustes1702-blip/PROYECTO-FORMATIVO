// src/routes/userRoute.js

const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/authMiddleware");

const {
  getUsers,
  getAllUsersById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

/**
 * @swagger
 * /api/users/UserAll:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Retorna una lista de todos los usuarios registrados en el sistema.
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 */

// Ruta obtener usuarios
router.get("/UserAll", verifyToken, getUsers);

/**
 * @swagger
 * /api/users/UserById/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     description: Retorna un usuario según el ID enviado.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 */

// Ruta obtener usuario por ID
router.get("/UserById/:id", verifyToken, getAllUsersById);

/**
 * @swagger
 * /api/users/CreateUser:
 *   post:
 *     summary: Crear usuario
 *     description: Crea un nuevo usuario en el sistema.
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente
 */

// Ruta crear usuario
router.post("/CreateUser", verifyToken, createUser);

/**
 * @swagger
 * /api/users/UpdateUser/{id}:
 *   put:
 *     summary: Actualizar usuario
 *     description: Actualiza un usuario según el ID enviado.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 */

// Ruta actualizar usuario
router.put("/UpdateUser/:id", verifyToken, updateUser);

/**
 * @swagger
 * /api/users/DeleteUser/{id}:
 *   delete:
 *     summary: Eliminar usuario
 *     description: Elimina un usuario según el ID enviado.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 */

// Ruta eliminar usuario
router.delete("/DeleteUser/:id", verifyToken, deleteUser); 

module.exports = router;