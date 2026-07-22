// src/routes/weighingRoute.js

const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/authMiddleware");

const {
  getWeighings,
  getAllWeighingsById,
  createWeighing,
  updateWeighing,
  deleteWeighing,
} = require("../controllers/weighingController");

/**
 * @swagger
 * /api/weighings/WeighingsAll:
 *   get:
 *     summary: Obtener todos los pesajes
 *     description: Retorna una lista de todos los pesajes registrados en el sistema.
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: Lista de pesajes obtenida exitosamente
 */

// Ruta obtener pesajes
router.get("/WeighingsAll", verifyToken, getWeighings);

/**
 * @swagger
 * /api/weighings/WeighingById/{id}:
 *   get:
 *     summary: Obtener pesaje por ID
 *     description: Retorna un pesaje según el ID enviado.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pesaje
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pesaje encontrado
 */

// Ruta obtener pesaje por ID
router.get("/WeighingById/:id", verifyToken, getAllWeighingsById);

/**
 * @swagger
 * /api/weighings/CreateWeighing:
 *   post:
 *     summary: Crear pesaje

 *     description: Crea un nuevo pesaje en el sistema.
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: Pesaje creado exitosamente
 */

// Ruta crear pesaje
router.post("/CreateWeighing", verifyToken, createWeighing);

/**
 * @swagger
 * /api/weighings/UpdateWeighing/{id}:
 *   put:
 *     summary: Actualizar pesaje
 *     description: Actualiza un pesaje según el ID enviado.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pesaje
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pesaje actualizado exitosamente
 */

// Ruta actualizar pesaje
router.put("/UpdateWeighing/:id", verifyToken, updateWeighing);

/**
 * @swagger
 * /api/weighings/DeleteWeighing/{id}:
 *   delete:
 *     summary: Eliminar pesaje
 *     description: Elimina un pesaje según el ID enviado.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pesaje
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pesaje eliminado exitosamente
 */

// Ruta eliminar pesaje
router.delete("/DeleteWeighing/:id", verifyToken, deleteWeighing);

module.exports = router;