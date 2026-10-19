const express = require("express");
const router = express.Router();

const ValidateToken = require("../middlewares/handlerToken.js");

const {
    getFeedings,
    getAllFeedingsById,
    createFeeding,
    updateFeeding,
    deleteFeeding
} = require("../controllers/feedingController");

/**
 * @swagger
 * /api/feedings/FeedingAll:
 *   get:
 *     summary: Obtener todas las alimentaciones
 *     description: Retorna una lista de todas las alimentaciones registradas.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Lista de alimentaciones obtenida exitosamente
 */
router.get("/FeedingAll", ValidateToken, getFeedings);

/**
 * @swagger
 * /api/feedings/Feeding/{id}:
 *   get:
 *     summary: Obtener alimentación por ID
 *     description: Retorna una alimentación según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Alimentación encontrada
 */
router.get("/Feeding/:id", ValidateToken, getAllFeedingsById);

/**
 * @swagger
 * /api/feedings/CreateFeeding:
 *   post:
 *     summary: Crear alimentación
 *     description: >
 *       Registra una alimentación y descuenta su cantidad de la cantidad_salida de la
 *       entrada de stock indicada (id_stockEntry). La entrada debe pertenecer al insumo
 *       (id_supply, tipo alimentacion) y tener disponible suficiente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_supply, id_stockEntry, id_responsable, shift, feedingDate, feedingTime, quantity]
 *             properties:
 *               id_supply: { type: string, example: "ALI001" }
 *               id_stockEntry: { type: integer, example: 1 }
 *               id_responsable: { type: integer, example: 1 }
 *               shift: { type: string, enum: [Mañana, Tarde, Noche] }
 *               feedingDate: { type: string, format: date, example: "2026-10-17" }
 *               feedingTime: { type: string, example: "06:30" }
 *               quantity: { type: number, example: 25 }
 *               active: { type: boolean, example: true }
 *     responses:
 *       200:
 *         description: Alimentación creada exitosamente
 */
router.post("/CreateFeeding", ValidateToken, createFeeding);

/**
 * @swagger
 * /api/feedings/UpdateFeeding/{id}:
 *   put:
 *     summary: Actualizar alimentación
 *     description: Actualiza una alimentación y ajusta la salida de la(s) entrada(s) de stock afectadas.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Alimentación actualizada exitosamente
 */
router.put("/UpdateFeeding/:id", ValidateToken, updateFeeding);

/**
 * @swagger
 * /api/feedings/DeleteFeeding/{id}:
 *   delete:
 *     summary: Eliminar alimentación
 *     description: Elimina una alimentación y devuelve su cantidad a la entrada de stock.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Alimentación eliminada exitosamente
 */
router.delete("/DeleteFeeding/:id", ValidateToken, deleteFeeding);

module.exports = router;