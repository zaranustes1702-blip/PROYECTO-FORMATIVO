/**
 * Script para crear el usuario eggbalance857@gmail.com
 * Ejecutar con: node crearUsuarioEggBalance.js
 */

require("dotenv").config();
const bcrypt = require("bcrypt");
const { randomUUID } = require("crypto");

const db = require("./src/config/conectionDB");
const User = require("./src/models/userModel");

const NOMBRE    = "Egg Balance";
const EMAIL     = "eggbalance857@gmail.com";
const PASSWORD  = "123456";
const DOCUMENTO = "1000000001";
const CARGO     = "Administrador";

async function crearUsuario() {
  try {
    await db.authenticate();
    console.log("✅ Conexión a la base de datos exitosa\n");

    // Verificar si ya existe
    const existe = await User.findOne({ where: { email: EMAIL } });

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(PASSWORD, salt);

    let usuario;
    if (existe) {
      console.log(`ℹ️ El usuario ${EMAIL} ya existe, actualizando credenciales...`);
      existe.name = NOMBRE;
      existe.password = passwordHash;
      existe.salt = salt;
      existe.documentId = DOCUMENTO;
      existe.postJob = CARGO;
      existe.active = true;
      existe.verifyEmail = true;
      existe.solicito_newPassword = false;
      existe.resetPasswordToken = null;
      await existe.save();
      usuario = existe;
      console.log("✅ Usuario actualizado correctamente.");
    } else {
      usuario = await User.create({
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
      console.log("✅ Nuevo usuario creado exitosamente.");
    }

    console.log("────────────────────────────────────");
    console.log(`   Nombre    : ${usuario.name}`);
    console.log(`   Correo    : ${usuario.email}`);
    console.log(`   Contraseña: ${PASSWORD}`);
    console.log(`   UUID      : ${usuario.uuid}`);
    console.log(`   ID en BD  : ${usuario.userId}`);
    console.log(`   Cargo     : ${usuario.postJob}`);
    console.log(`   Activo    : ${usuario.active}`);
    console.log(`   Verificado: ${usuario.verifyEmail}`);
    console.log("────────────────────────────────────");

  } catch (error) {
    console.error("❌ Error al crear/actualizar usuario:", error);
  } finally {
    await db.close();
    process.exit(0);
  }
}

crearUsuario();
