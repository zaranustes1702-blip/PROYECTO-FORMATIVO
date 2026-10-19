// src/routes/stockEntryRoute.js

const express = require("express");
const router = express.Router();
const ValidateToken = require("../middlewares/handlerToken.js");

const {
  getStockEntries,
  getStockEntryDetail,
  createStockEntry,
  updateStockEntry,
  deleteStockEntry,
} = require("../controllers/stockEntryController");

/**
 * @swagger
 * /api/stock-entries/StockEntryAll:
 *   get:
 *     summary: Obtener todas las entradas de insumos
 *     description: Retorna las entradas de insumos (con insumo y galpón asociados). Admite paginación con limit y offset.
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *     responses:
 *       200:
 *         description: Lista de entradas obtenida exitosamente
 */
router.get("/StockEntryAll", ValidateToken, getStockEntries);

/**
 * @swagger
 * /api/stock-entries/StockEntry/{id}:
 *   get:
 *     summary: Obtener entrada de insumo por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Entrada encontrada
 *       404:
 *         description: La entrada no existe
 */
router.get("/StockEntry/:id", ValidateToken, getStockEntryDetail);

/**
 * @swagger
 * /api/stock-entries/CreateStockEntry:
 *   post:
 *     summary: Registrar entrada de insumo
 *     description: >
 *       Registra el ingreso de un insumo a un galpón. unid_entrada es el tipo de la cantidad inicial.
 *       cantidad_salida empieza en 0 y la va sumando el módulo de alimentación (feeding);
 *       disponible_entrada = cantidad_inicial - cantidad_salida. precio_total se calcula como
 *       cantidad_inicial * precio_unitario si no se envía. active es true/false (por defecto true).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_supply, id_barn, cantidad_inicial, unid_entrada, vencimiento, precio_unitario]
 *             properties:
 *               id_supply: { type: string, example: "ALI001" }
 *               id_barn: { type: integer, example: 1 }
 *               cantidad_inicial: { type: number, example: 500 }
 *               unid_entrada: { type: string, example: "kg" }
 *               vencimiento: { type: string, format: date, example: "2027-03-31" }
 *               precio_unitario: { type: number, example: 12.5 }
 *               precio_total: { type: number, example: 6250 }
 *               active: { type: boolean, example: true }
 *     responses:
 *       201:
 *         description: Entrada creada exitosamente
 *       400:
 *         description: Datos inválidos o insumo/galpón inexistente
 */
router.post("/CreateStockEntry", ValidateToken, createStockEntry);

/**
 * @swagger
 * /api/stock-entries/UpdateStockEntry/{id}:
 *   put:
 *     summary: Actualizar entrada de insumo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Entrada actualizada exitosamente
 *       404:
 *         description: La entrada no existe
 */
router.put("/UpdateStockEntry/:id", ValidateToken, updateStockEntry);

/**
 * @swagger
 * /api/stock-entries/DeleteStockEntry/{id}:
 *   delete:
 *     summary: Eliminar entrada de insumo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Entrada eliminada exitosamente
 *       404:
 *         description: La entrada no existe
 */
router.delete("/DeleteStockEntry/:id", ValidateToken, deleteStockEntry);

module.exports = router;
