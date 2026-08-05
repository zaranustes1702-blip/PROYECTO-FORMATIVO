const express = require("express");
const router = express.Router();

// const verifyToken = require("../middlewares/authMiddleware");

const {
    login,
    resetPassword,
    validateResetPassword,
    newPassword
} = require("../controllers/authController");

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login usuario
 *     description: Genera un token JWT para autenticación.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 */
router.post("/login", login);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Solicitar recuperación de contraseña
 *     description: Envía una solicitud para recuperar la contraseña.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Solicitud enviada correctamente
 */
router.post("/reset-password", resetPassword);

/**
 * @swagger
 * /api/auth/validate-reset-password:
 *   post:
 *     summary: Validar token de recuperación
 *     description: Valida el token enviado para recuperar la contraseña.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token válido
 */
router.post("/validate-reset-password", validateResetPassword);

/**
 * @swagger
 * /api/auth/new-password:
 *   post:
 *     summary: Establecer nueva contraseña
 *     description: Permite asignar una nueva contraseña al usuario.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 */
router.post("/new-password", newPassword);

module.exports = router;