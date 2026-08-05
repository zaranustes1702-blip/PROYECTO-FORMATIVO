const express = require("express");
const router = express.Router();
const ValidateToken = require("../middlewares/handlerToken.js");

const {
    getAllHealth,
    getAllHealthsById,
    createHealth,
    updateHealth,
    deleteHealth
} = require("../controllers/healthController");
const { healthCreate } = require("../services/healthServices");

/**
 * @swagger
 * /api/health/HealthAll:
 *   get:
 *     summary: Obtener todos los registros de salud
 *     description: Retorna una lista de todos los registros de salud.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Lista de registros obtenida exitosamente
 */
router.get("/HealthAll", ValidateToken, getAllHealth);

/**
 * @swagger
 * /api/health/Health/{id}:
 *   get:
 *     summary: Obtener registro de salud por ID
 *     description: Retorna un registro de salud según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro encontrado
 */
router.get("/Health/:id", ValidateToken, getAllHealthsById);

/**
 * @swagger
 * /api/health/CreateHealth:
 *   post:
 *     summary: Crear registro de salud
 *     description: Crea un nuevo registro de salud.
 *     responses:
 *       200:
 *         description: Registro creado exitosamente
 */
router.post("/CreateHealth", ValidateToken,createHealth);

/**
 * @swagger
 * /api/health/UpdateHealth/{id}:
 *   put:
 *     summary: Actualizar registro de salud
 *     description: Actualiza un registro de salud.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro actualizado exitosamente
 */
router.put("/UpdateHealth/:id", ValidateToken, updateHealth);

/**
 * @swagger
 * /api/health/DeleteHealth/{id}:
 *   delete:
 *     summary: Eliminar registro de salud
 *     description: Elimina un registro de salud.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro eliminado exitosamente
 */
router.delete("/DeleteHealth/:id", ValidateToken, deleteHealth);

module.exports = router;