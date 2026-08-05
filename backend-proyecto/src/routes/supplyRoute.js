// src/routes/supplyRoute.js

const express = require("express");
const router = express.Router();
const ValidateToken = require("../middlewares/handlerToken.js");

const {
  getSupplies,
  getAllSuppliesById,
  createSupply,
  updateSupply,
  deleteSupply,
} = require("../controllers/supplyController");

/**
 * @swagger
 * /api/supplies/SupplyAll:
 *   get:
 *     summary: Obtener todos los insumos
 *     description: Retorna una lista de todos los insumos registrados en el sistema.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Lista de insumos obtenida exitosamente
 */
router.get("/SupplyAll", ValidateToken, getSupplies);

/**
 * @swagger
 * /api/supplies/Supply/{id}:
 *   get:
 *     summary: Obtener insumo por ID
 *     description: Retorna un insumo según el ID enviado.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Insumo encontrado
 */
router.get("/Supply/:id", ValidateToken, getAllSuppliesById);

/**
 * @swagger
 * /api/supplies/CreateSupply:
 *   post:
 *     summary: Crear insumo
 *     description: Crea un nuevo registro de insumo en el sistema.
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Insumo creado exitosamente
 */
router.post("/CreateSupply", ValidateToken, createSupply);

/**
 * @swagger
 * /api/supplies/UpdateSupply/{id}:
 *   put:
 *     summary: Actualizar insumo
 *     description: Actualiza un insumo según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Insumo actualizado exitosamente
 */
router.put("/UpdateSupply/:id", ValidateToken, updateSupply);

/**
 * @swagger
 * /api/supplies/DeleteSupply/{id}:
 *   delete:
 *     summary: Eliminar insumo
 *     description: Elimina un insumo según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Insumo eliminado exitosamente
 */
router.delete("/DeleteSupply/:id", ValidateToken, deleteSupply);

module.exports = router;