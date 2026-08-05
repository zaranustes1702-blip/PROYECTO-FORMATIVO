const express = require("express");
const router = express.Router();

const ValidateToken = require("../middlewares/handlerToken.js");

const {
    getEggProductions,
    getAllEggProductionsById,
    createEggProduction,
    updateEggProduction,
    deleteEggProduction
} = require("../controllers/eggProductionController");

/**
 * @swagger
 * /api/egg-productions/EggProductionAll:
 *   get:
 *     summary: Obtener toda la producción de huevos
 *     responses:
 *       200:
 *         description: Lista de producciones obtenida exitosamente
 */
router.get("/EggProductionAll", ValidateToken, getEggProductions);

/**
 * @swagger
 * /api/egg-productions/EggProduction/{id}:
 *   get:
 *     summary: Obtener producción por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Producción encontrada
 */
router.get("/EggProduction/:id", ValidateToken, getAllEggProductionsById);

/**
 * @swagger
 * /api/egg-productions/CreateEggProduction:
 *   post:
 *     summary: Crear producción de huevos
 *     responses:
 *       200:
 *         description: Producción creada exitosamente
 */
router.post("/CreateEggProduction", ValidateToken,  createEggProduction);

/**
 * @swagger
 * /api/egg-productions/UpdateEggProduction/{id}:
 *   put:
 *     summary: Actualizar producción de huevos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Producción actualizada exitosamente
 */
router.put("/UpdateEggProduction/:id", ValidateToken,  updateEggProduction);

/**
 * @swagger
 * /api/egg-productions/DeleteEggProduction/{id}:
 *   delete:
 *     summary: Eliminar producción de huevos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Producción eliminada exitosamente
 */
router.delete("/DeleteEggProduction/:id", ValidateToken, deleteEggProduction);

module.exports = router;