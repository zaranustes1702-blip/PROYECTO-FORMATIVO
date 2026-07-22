const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/authMiddleware");

const {
    getAllMortalities,
    getMortalityById,
    createMortality,
    updateMortality,
    deleteMortality
} = require("../controllers/mortalityController");

/**
 * @swagger
 * /api/mortalities/MortalityAll:
 *   get:
 *     summary: Obtener todos los registros de mortalidad
 *     description: Retorna una lista de todos los registros de mortalidad.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Lista de mortalidades obtenida exitosamente
 */
router.get("/MortalityAll", verifyToken, getAllMortalities);

/**
 * @swagger
 * /api/mortalities/MortalityById/{id}:
 *   get:
 *     summary: Obtener mortalidad por ID
 *     description: Retorna un registro de mortalidad según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Mortalidad encontrada
 */
router.get("/MortalityById/:id", verifyToken, getMortalityById);

/**
 * @swagger
 * /api/mortalities/CreateMortality:
 *   post:
 *     summary: Crear registro de mortalidad
 *     description: Crea un nuevo registro de mortalidad.
 *     responses:
 *       200:
 *         description: Registro creado exitosamente
 */
router.post("/CreateMortality", verifyToken, createMortality);

/**
 * @swagger
 * /api/mortalities/UpdateMortality/{id}:
 *   put:
 *     summary: Actualizar mortalidad
 *     description: Actualiza un registro de mortalidad.
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
router.put("/UpdateMortality/:id", verifyToken, updateMortality);

/**
 * @swagger
 * /api/mortalities/DeleteMortality/{id}:
 *   delete:
 *     summary: Eliminar mortalidad
 *     description: Elimina un registro de mortalidad.
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
router.delete("/DeleteMortality/:id", verifyToken, deleteMortality);

module.exports = router;