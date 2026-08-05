const express = require("express");
const router = express.Router();

const ValidateToken = require("../middlewares/handlerToken.js");

const {
    getQuarantines,
    getAllQuarantinesById,
    createQuarantine,
    updateQuarantine,
    deleteQuarantine
} = require("../controllers/quarantineController");

/**
 * @swagger
 * /api/quarantines/QuarantineAll:
 *   get:
 *     summary: Obtener todas las cuarentenas
 *     description: Retorna una lista de todas las cuarentenas registradas.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Lista de cuarentenas obtenida exitosamente
 */
router.get("/QuarantineAll", ValidateToken, getQuarantines);

/**
 * @swagger
 * /api/quarantines/Quarantine/{id}:
 *   get:
 *     summary: Obtener cuarentena por ID
 *     description: Retorna una cuarentena según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cuarentena encontrada
 */
router.get("/Quarantine/:id", ValidateToken, getAllQuarantinesById);

/**
 * @swagger
 * /api/quarantines/CreateQuarantine:
 *   post:
 *     summary: Crear cuarentena
 *     description: Crea una nueva cuarentena.
 *     responses:
 *       200:
 *         description: Cuarentena creada exitosamente
 */
router.post("/CreateQuarantine", ValidateToken, createQuarantine);

/**
 * @swagger
 * /api/quarantines/UpdateQuarantine/{id}:
 *   put:
 *     summary: Actualizar cuarentena
 *     description: Actualiza una cuarentena.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cuarentena actualizada exitosamente
 */
router.put("/UpdateQuarantine/:id", ValidateToken, updateQuarantine);

/**
 * @swagger
 * /api/quarantines/DeleteQuarantine/{id}:
 *   delete:
 *     summary: Eliminar cuarentena
 *     description: Elimina una cuarentena.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cuarentena eliminada exitosamente
 */
router.delete("/DeleteQuarantine/:id", ValidateToken, deleteQuarantine);

module.exports = router;