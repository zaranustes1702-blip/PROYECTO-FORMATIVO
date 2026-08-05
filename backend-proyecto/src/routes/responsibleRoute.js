const express = require("express");
const router = express.Router();

const ValidateToken = require("../middlewares/handlerToken.js");

const {
    getResponsibles,
    getAllResponsiblesById,
    createResponsible,
    updateResponsible,
    deleteResponsible
} = require("../controllers/responsibleController");

/**
 * @swagger
 * /api/responsibles/ResponsibleAll:
 *   get:
 *     summary: Obtener todos los responsables
 *     description: Retorna una lista de todos los responsables registrados.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Lista de responsables obtenida exitosamente
 */
router.get("/ResponsibleAll", ValidateToken, getResponsibles);

/**
 * @swagger
 * /api/responsibles/Responsible/{id}:
 *   get:
 *     summary: Obtener responsable por ID
 *     description: Retorna un responsable según el ID enviado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Responsable encontrado
 */
router.get("/Responsible/:id", ValidateToken, getAllResponsiblesById);

/**
 * @swagger
 * /api/responsibles/CreateResponsible:
 *   post:
 *     summary: Crear responsable
 *     description: Crea un nuevo responsable.
 *     responses:
 *       200:
 *         description: Responsable creado exitosamente
 */
router.post("/CreateResponsible",ValidateToken, createResponsible);

/**
 * @swagger
 * /api/responsibles/UpdateResponsible/{id}:
 *   put:
 *     summary: Actualizar responsable
 *     description: Actualiza un responsable.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Responsable actualizado exitosamente
 */
router.put("/UpdateResponsible/:id", ValidateToken, updateResponsible);

/**
 * @swagger
 * /api/responsibles/DeleteResponsible/{id}:
 *   delete:
 *     summary: Eliminar responsable
 *     description: Elimina un responsable.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Responsable eliminado exitosamente
 */
router.delete("/DeleteResponsible/:id", ValidateToken, deleteResponsible);

module.exports = router;