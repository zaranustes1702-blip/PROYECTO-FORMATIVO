const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/authMiddleware");

const {
    getAllSupplies,
    getSupplyById,
    createSupply,
    updateSupply,
    deleteSupply
} = require("../controllers/supplyController");

/**
 * @swagger
 * /api/supplies/SupplyAll:
 *   get:
 *     summary: Obtener todos los insumos
 *     description: Retorna lista de insumos del sistema.
 */
router.get("/SupplyAll", verifyToken, getAllSupplies);

/**
 * @swagger
 * /api/supplies/SupplyById/{id}:
 */
router.get("/SupplyById/:id", verifyToken, getSupplyById);

/**
 * @swagger
 * /api/supplies/CreateSupply:
 */
router.post("/CreateSupply", verifyToken, createSupply);

/**
 * @swagger
 * /api/supplies/UpdateSupply/{id}:
 */
router.put("/UpdateSupply/:id", verifyToken, updateSupply);

/**
 * @swagger
 * /api/supplies/DeleteSupply/{id}:
 */
router.delete("/DeleteSupply/:id", verifyToken, deleteSupply);

module.exports = router;