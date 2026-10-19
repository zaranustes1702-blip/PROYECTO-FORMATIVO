const {
  getAllHealths,
  getHealthById,
  HealthCreate,
  HealthUpdate,
  HealthDelete,
} = require("../services/healthServices");

const { getIdBirdBatch } = require("../services/birdBatchServices");
const { getSupplyById } = require("../services/supplyServices");

const Response = require("../functions/response");

// Convierte el estado recibido (true/false o "true"/"false") a booleano
const convertirActivo = (valor) => valor === true || valor === "true";

// Revisa los datos recibidos y devuelve la lista de errores
const revisarDatos = async (body) => {
  const { id_lote, id_supply, healthDate, vaccineQuantity, vaccineName } = body;

  var errors = [];

  if (!id_lote) {
    errors.push("El lote es obligatorio");
  }

  if (!id_supply) {
    errors.push("El insumo es obligatorio");
  }

  if (!healthDate) {
    errors.push("La fecha de sanidad es obligatoria");
  }

  if (!vaccineQuantity || vaccineQuantity <= 0) {
    errors.push("La cantidad de vacunas debe ser mayor a 0");
  }

  if (!vaccineName || vaccineName.trim() === "") {
    errors.push("El nombre de la vacuna es obligatorio");
  }

  // El lote debe existir
  if (id_lote) {
    const lote = await getIdBirdBatch(id_lote);

    if (!lote) {
      errors.push("El lote seleccionado no existe");
    }
  }

  // El insumo debe existir y ser de tipo medicamentos
  if (id_supply) {
    const insumo = await getSupplyById(id_supply);

    if (!insumo) {
      errors.push("El insumo seleccionado no existe");
    } else if (insumo.supplyType !== "medicamentos") {
      errors.push("El insumo seleccionado debe ser de tipo medicamentos");
    }
  }
  return errors;
};

const getHealths = async (req, res) => {
  try {
    const querylimit = req.query.limit;
    const queryoffset = req.query.offset;
    const limit = querylimit ? parseInt(querylimit) : 10;
    const offset = queryoffset ? parseInt(queryoffset) : 0;

    const lista = await getAllHealths(limit, offset);

    const response = new Response(
      true,
      "Registros de sanidad obtenidos exitosamente",
      lista,
    );

    res.status(200);
    res.json(response.json);
  } catch (error) {
    console.error("Error obteniendo registros de sanidad:", error);
    const errorResponse = new Response(false, "Error interno del servidor", [
      { message: error.message || "Ocurrió un error inesperado" },
    ]);
    res.status(500);
    res.json(errorResponse.json);
  }
};

const getAllHealthsById = async (req, res) => {
  try {
    const { id } = req.params;
    var errors = [];

    if (!id) {
      errors.push("El ID del registro es obligatorio");
    }

    if (errors.length > 0) {
      var response = new Response(false, "Error al obtener el registro", errors);
      res.status(400);
      res.json(response.json);
      return;
    }

    const registro = await getHealthById(id);

    // Validación de existencia del ID
    if (!registro) {
      var response = new Response(false, "El registro no existe", []);

      res.status(404);
      res.json(response.json);
      return;
    }

    var response = new Response(true, "Registro obtenido exitosamente", registro);

    res.status(200);
    res.json(response.json);
  } catch (error) {
    console.error("Error obteniendo registro:", error);

    const errorResponse = new Response(false, "Error interno del servidor", [
      { message: error.message || "Ocurrió un error inesperado" },
    ]);

    res.status(500);
    res.json(errorResponse.json);
  }
};

const createHealth = async (req, res) => {
  try {
    const { active } = req.body;

    var errors = await revisarDatos(req.body);

    if (errors.length > 0) {
      var response = new Response(false, "Error al crear el registro", errors);

      res.status(400);
      return res.json(response.json);
    }

    const data = {
      id_lote: req.body.id_lote,
      id_supply: req.body.id_supply,
      healthDate: req.body.healthDate,
      vaccineQuantity: req.body.vaccineQuantity,
      vaccineName: req.body.vaccineName,
    };
    data.active = active === undefined ? true : convertirActivo(active);

    const registro = await HealthCreate(data);

    var response = new Response(true, "Registro de sanidad creado exitosamente", registro);

    res.status(201);
    res.json(response.json);
  } catch (error) {
    console.error("Error en crear registro:", error);

    const errorResponse = new Response(false, "Error interno del servidor", [
      { message: error.message || "Ocurrió un error inesperado" },
    ]);

    res.status(500);
    res.json(errorResponse.json);
  }
};

const updateHealth = async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    var errors = await revisarDatos(req.body);

    if (!id) {
      errors.push("El ID del registro es obligatorio");
    }

    if (errors.length > 0) {
      var response = new Response(false, "Error al actualizar el registro", errors);

      res.status(400);
      return res.json(response.json);
    }

    const existente = await getHealthById(id);

    if (!existente) {
      var response = new Response(false, "El registro no existe", []);

      res.status(404);
      return res.json(response.json);
    }

    const data = {
      id_lote: req.body.id_lote,
      id_supply: req.body.id_supply,
      healthDate: req.body.healthDate,
      vaccineQuantity: req.body.vaccineQuantity,
      vaccineName: req.body.vaccineName,
    };

    // Solo actualiza el estado si se envía
    if (active !== undefined) {
      data.active = convertirActivo(active);
    }

    const registro = await HealthUpdate(id, data);

    var response = new Response(true, "Registro de sanidad actualizado exitosamente", registro);

    res.status(200);
    res.json(response.json);
  } catch (error) {
    console.error("Error en actualizar registro:", error);

    const errorResponse = new Response(false, "Error interno del servidor", [
      { message: error.message || "Ocurrió un error inesperado" },
    ]);

    res.status(500);
    res.json(errorResponse.json);
  }
};

const deleteHealth = async (req, res) => {
  try {
    const { id } = req.params;

    var errors = [];

    if (!id) {
      errors.push("El ID del registro es obligatorio");
    }

    if (errors.length > 0) {
      var response = new Response(false, "Error al eliminar el registro", errors);

      res.status(400);
      return res.json(response.json);
    }

    const registro = await HealthDelete(id);

    var response = new Response(true, "Registro de sanidad eliminado exitosamente", registro);

    res.status(200);
    res.json(response.json);
  } catch (error) {
    console.error("Error en eliminar registro:", error);

    const errorResponse = new Response(false, "Error interno del servidor", [
      { message: error.message || "Ocurrió un error inesperado" },
    ]);

    res.status(500);
    res.json(errorResponse.json);
  }
};

module.exports = {
  getHealths,
  getAllHealthsById,
  createHealth,
  updateHealth,
  deleteHealth,
};
