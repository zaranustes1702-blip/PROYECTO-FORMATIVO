// src/routes/birdBatchRoute.js

const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/authMiddleware");

const {
  getBirdBatches,
  getAllBirdBatchesById,
  createBirdBatch,
  updateBirdBatch,
  deleteBirdBatch,
} = require("../controllers/birdBatchController");

/**
 * @swagger
 * /api/bird-batches/BirdBatchAll:
 *   get:
 *     summary: Obtener todos los lotes de aves
 *     description: Retorna una lista de todos los lotes de aves registrados en el sistema.
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: Lista de lotes obtenida exitosamente
 */

// Ruta obtener lotes
router.get("/BirdBatchAll", /* verifyToken, */ getBirdBatches);

/**
 * @swagger
 * /api/bird-batches/BirdBatchById/{id}:
 *   get:
 *     summary: Obtener lote de aves por ID
 *     description: Retorna un lote de aves según el ID enviado.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del lote
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lote encontrado
 */

// Ruta obtener lote por ID
router.get("/BirdBatchById/:id", /* verifyToken, */ getAllBirdBatchesById);

/**
 * @swagger
 * /api/bird-batches/CreateBirdBatch:
 *   post:
 *     summary: Crear lote de aves
 *     description: Crea un nuevo lote de aves en el sistema.
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: Lote creado exitosamente
 */

// Ruta crear lote
router.post("/CreateBirdBatch", /* verifyToken, */ createBirdBatch);

/**
 * @swagger
 * /api/bird-batches/UpdateBirdBatch/{id}:
 *   put:
 *     summary: Actualizar lote de aves
 *     description: Actualiza un lote de aves según el ID enviado.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del lote
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lote actualizado exitosamente
 */

// Ruta actualizar lote
router.put("/UpdateBirdBatch/:id", /* verifyToken, */ updateBirdBatch);

/**
 * @swagger
 * /api/bird-batches/DeleteBirdBatch/{id}:
 *   delete:
 *     summary: Eliminar lote de aves
 *     description: Elimina un lote de aves según el ID enviado.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del lote
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lote eliminado exitosamente
 */

// Ruta eliminar lote
router.delete("/DeleteBirdBatch/:id", /* verifyToken, */ deleteBirdBatch);

module.exports = router;