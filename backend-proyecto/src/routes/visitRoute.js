// src/routes/visitRoute.js

const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/authMiddleware");

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
router.get("/VisitAll", verifyToken, getVisits);

/**
 * @swagger
 * /api/visits/VisitById/{id}:
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
router.get("/VisitById/:id", verifyToken, getAllVisitsById);

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
router.post("/CreateVisit", verifyToken, createVisit);

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
router.put("/UpdateVisit/:id", verifyToken, updateVisit);

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
router.delete("/DeleteVisit/:id", verifyToken, deleteVisit);

module.exports = router;