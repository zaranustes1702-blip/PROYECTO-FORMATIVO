const express = require("express");
const router = express.Router();

//const verifyToken = require("../middlewares/authMiddleware");

const {
  getBarns,
  getAllBarnsById,
  createBarn,
  updateBarn,
  deleteBarn,
} = require("../controllers/barnController");

/**
 * @swagger
 * /api/barns/BarnAll:
 *   get:
 *     summary: Obtener todos los galpones
 *     description: Retorna una lista de todos los galpones registrados en el sistema.
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: Lista de galpones obtenida exitosamente
 */

// Ruta obtener galpones
router.get("/BarnAll", getBarns);

/**
 * @swagger
 * /api/barns/BarnById/{id}:
 *   get:
 *     summary: Obtener galpón por ID
 *     description: Retorna un galpón según el ID enviado.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del galpón
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Galpón encontrado
 */

// Ruta obtener galpón por ID
router.get("/BarnById/:id", getAllBarnsById);

/**
 * @swagger
 * /api/barns/CreateBarn:
 *   post:
 *     summary: Crear galpón
 *     description: Crea un nuevo galpón en el sistema.
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: Galpón creado exitosamente
 */

// Ruta crear galpón
router.post("/CreateBarn", createBarn);

/**
 * @swagger
 * /api/barns/UpdateBarn/{id}:
 *   put:
 *     summary: Actualizar galpón
 *     description: Actualiza un galpón según el ID enviado.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del galpón
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Galpón actualizado exitosamente
 */

// Ruta actualizar galpón
router.put("/UpdateBarn/:id", updateBarn);

/**
 * @swagger
 * /api/barns/DeleteBarn/{id}:
 *   delete:
 *     summary: Eliminar galpón
 *     description: Elimina un galpón según el ID enviado.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del galpón
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Galpón eliminado exitosamente
 */

// Ruta eliminar galpón
router.delete("/DeleteBarn/:id", deleteBarn);

module.exports = router;