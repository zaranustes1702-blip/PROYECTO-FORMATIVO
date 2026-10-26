/**
 * Script para crear el usuario definitivo
 * Ejecutar con: node crearUsuarioPrueba.js
 */

require("dotenv").config();
const bcrypt = require("bcrypt");
const { randomUUID } = require("crypto");

const db = require("./src/config/conectionDB");
const User = require("./src/models/userModel");

const NOMBRE    = "Zara Ñustes";
const EMAIL     = "zaranustes1702@gmail.com";
const PASSWORD  = "123456";
const DOCUMENTO = "123456789";
const CARGO     = "Administrador";

// Correos de los usuarios de prueba anteriores a eliminar
const CORREOS_ELIMINAR = [
  "prueba@eggbalance.com",
  "zaranustes1702@gmail.com",
];

async function crearUsuario() {
  try {
    await db.authenticate();
    console.log("✅ Conexión a la base de datos exitosa\n");

    // Eliminar usuarios anteriores
    for (const correo of CORREOS_ELIMINAR) {
      const existe = await User.findOne({ where: { email: correo } });
      if (existe) {
        await existe.destroy();
        console.log(`🗑️  Usuario eliminado: ${correo}`);
      }
    }

    console.log("");

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(PASSWORD, salt);

    // Crear usuario definitivo
    const nuevoUsuario = await User.create({
      name:        NOMBRE,
      uuid:        randomUUID(),
      email:       EMAIL,
      password:    passwordHash,
      salt:        salt,
      documentId:  DOCUMENTO,
      postJob:     CARGO,
      active:      true,
      verifyEmail: true,
    });

    console.log("✅ Usuario definitivo creado:");
    console.log("────────────────────────────────────");
    console.log(`   Nombre    : ${NOMBRE}`);
    console.log(`   Correo    : ${EMAIL}`);
    console.log(`   Contraseña: ${PASSWORD}`);
    console.log(`   ID en BD  : ${nuevoUsuario.userId}`);
    console.log("────────────────────────────────────");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await db.close();
    process.exit(0);
  }
}

crearUsuario();
