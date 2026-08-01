const express = require("express");
const router = express.Router();

//const verifyToken = require("../middlewares/authMiddleware");

const {
    getAllEggProductions,
    getEggProductionById,
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
router.get("/EggProductionAll", getAllEggProductions);

/**
 * @swagger
 * /api/egg-productions/EggProductionById/{id}:
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
router.get("/EggProductionById/:id",  getEggProductionById);

/**
 * @swagger
 * /api/egg-productions/CreateEggProduction:
 *   post:
 *     summary: Crear producción de huevos
 *     responses:
 *       200:
 *         description: Producción creada exitosamente
 */
router.post("/CreateEggProduction",  createEggProduction);

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
router.put("/UpdateEggProduction/:id",  updateEggProduction);

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
router.delete("/DeleteEggProduction/:id", deleteEggProduction);

module.exports = router;