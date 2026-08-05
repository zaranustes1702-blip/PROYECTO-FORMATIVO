// src/routes/visitRoute.js

const express = require("express");
const router = express.Router();
const ValidateToken = require("../middlewares/handlerToken.js");

const {
  getVisits,
  getAllVisitsById,
  createVisit,
  updateVisit,
  deleteVisit,
} = require("../controllers/visitController");

/**
 * @swagger
 * /api/visits/VisitAll:
 *   get:
 *     summary: Obtener todas las visitas
 *     description: Retorna una lista de todas las visitas registradas en el sistema.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Lista de visitas obtenida exitosamente
 */
router.get("/VisitAll", ValidateToken, getVisits);

/**
 * @swagger
 * /api/visits/Visit/{id}:
 *   get:
 *     summary: Obtener visita por ID
 *     description: Retorna una visita según el ID enviado.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Visita encontrada
 */
router.get("/Visit/:id", ValidateToken, getAllVisitsById);

/**
 * @swagger
 * /api/visits/CreateVisit:
 *   post:
 *     summary: Crear visita
 *     description: Crea un nuevo registro de visita en el sistema.
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
 *         description: Visita creada exitosamente
 */
router.post("/CreateVisit", ValidateToken,createVisit);

/**
 * @swagger
 * /api/visits/UpdateVisit/{id}:
 *   put:
 *     summary: Actualizar visita
 *     description: Actualiza una visita según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Visita actualizada exitosamente
 */
router.put("/UpdateVisit/:id", ValidateToken, updateVisit);

/**
 * @swagger
 * /api/visits/DeleteVisit/{id}:
 *   delete:
 *     summary: Eliminar visita
 *     description: Elimina una visita según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Visita eliminada exitosamente
 */
router.delete("/DeleteVisit/:id", ValidateToken, deleteVisit);

module.exports = router;