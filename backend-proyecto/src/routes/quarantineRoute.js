const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/authMiddleware");

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
router.get("/QuarantineAll", verifyToken, getQuarantines);

/**
 * @swagger
 * /api/quarantines/QuarantineById/{id}:
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
router.get("/QuarantineById/:id", verifyToken, getAllQuarantinesById);

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
router.post("/CreateQuarantine", verifyToken, createQuarantine);

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
router.put("/UpdateQuarantine/:id", verifyToken, updateQuarantine);

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
router.delete("/DeleteQuarantine/:id", verifyToken, deleteQuarantine);

module.exports = router;