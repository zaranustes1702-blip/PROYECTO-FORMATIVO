const express = require("express");
const router = express.Router();

//const verifyToken = require("../middlewares/authMiddleware");

const {
    getAllFeedings,
    getFeedingById,
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
router.get("/FeedingAll", getAllFeedings);

/**
 * @swagger
 * /api/feedings/FeedingById/{id}:
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
router.get("/FeedingById/:id", getFeedingById);

/**
 * @swagger
 * /api/feedings/CreateFeeding:
 *   post:
 *     summary: Crear alimentación
 *     description: Registra una nueva alimentación.
 *     responses:
 *       200:
 *         description: Alimentación creada exitosamente
 */
router.post("/CreateFeeding", createFeeding);

/**
 * @swagger
 * /api/feedings/UpdateFeeding/{id}:
 *   put:
 *     summary: Actualizar alimentación
 *     description: Actualiza una alimentación según el ID enviado.
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
router.put("/UpdateFeeding/:id", updateFeeding);

/**
 * @swagger
 * /api/feedings/DeleteFeeding/{id}:
 *   delete:
 *     summary: Eliminar alimentación
 *     description: Elimina una alimentación según el ID enviado.
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
router.delete("/DeleteFeeding/:id", deleteFeeding);

module.exports = router;