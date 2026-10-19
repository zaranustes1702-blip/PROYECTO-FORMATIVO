const {
  getAllQuarantines,
  getQuarantineById,
  QuarantineCreate,
  QuarantineUpdate,
  QuarantineDelete,
} = require("../services/quarantineServices");

const { getIdBirdBatch } = require("../services/birdBatchServices");
const { getSupplyById } = require("../services/supplyServices");

const Response = require("../functions/response");

// Convierte el estado recibido (true/false o "true"/"false") a booleano
const convertirActivo = (valor) => valor === true || valor === "true";

// Revisa los datos recibidos y devuelve la lista de errores
const revisarDatos = async (body) => {
  const {
    id_lote,
    id_supply,
    quarantineDate,
    affectedBirds,
    symptoms,
    diagnosis,
    treatmentApplied,
    dosage,
    treatmentDuration,
  } = body;

  var errors = [];

  if (!id_lote) {
    errors.push("El lote es obligatorio");
  }

  if (!id_supply) {
    errors.push("El insumo es obligatorio");
  }

  if (!quarantineDate) {
    errors.push("La fecha de la cuarentena es obligatoria");
  }

  if (!affectedBirds || affectedBirds <= 0) {
    errors.push("Las aves afectadas deben ser mayor a 0");
  }

  if (!symptoms || symptoms.trim() === "") {
    errors.push("Los síntomas son obligatorios");
  }

  if (!diagnosis || diagnosis.trim() === "") {
    errors.push("El diagnóstico es obligatorio");
  }

  if (!treatmentApplied || treatmentApplied.trim() === "") {
    errors.push("El tratamiento aplicado es obligatorio");
  }

  if (!dosage || dosage.trim() === "") {
    errors.push("La dosis es obligatoria");
  }

  if (!treatmentDuration || treatmentDuration.trim() === "") {
    errors.push("La duración del tratamiento es obligatoria");
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

const getQuarantines = async (req, res) => {
  try {
    const querylimit = req.query.limit;
    const queryoffset = req.query.offset;
    const limit = querylimit ? parseInt(querylimit) : 10;
    const offset = queryoffset ? parseInt(queryoffset) : 0;

    const lista = await getAllQuarantines(limit, offset);

    const response = new Response(
      true,
      "Registros de cuarentena obtenidos exitosamente",
      lista,
    );

    res.status(200);
    res.json(response.json);
  } catch (error) {
    console.error("Error obteniendo registros de cuarentena:", error);
    const errorResponse = new Response(false, "Error interno del servidor", [
      { message: error.message || "Ocurrió un error inesperado" },
    ]);
    res.status(500);
    res.json(errorResponse.json);
  }
};

const getAllQuarantinesById = async (req, res) => {
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

    const registro = await getQuarantineById(id);

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

const createQuarantine = async (req, res) => {
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
      quarantineDate: req.body.quarantineDate,
      affectedBirds: req.body.affectedBirds,
      symptoms: req.body.symptoms,
      diagnosis: req.body.diagnosis,
      treatmentApplied: req.body.treatmentApplied,
      dosage: req.body.dosage,
      treatmentDuration: req.body.treatmentDuration,
      observations: req.body.observations,
      quarantineEndDate: req.body.quarantineEndDate || null,
    };
    data.active = active === undefined ? true : convertirActivo(active);

    const registro = await QuarantineCreate(data);

    var response = new Response(true, "Registro de cuarentena creado exitosamente", registro);

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

const updateQuarantine = async (req, res) => {
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

    const existente = await getQuarantineById(id);

    if (!existente) {
      var response = new Response(false, "El registro no existe", []);

      res.status(404);
      return res.json(response.json);
    }

    const data = {
      id_lote: req.body.id_lote,
      id_supply: req.body.id_supply,
      quarantineDate: req.body.quarantineDate,
      affectedBirds: req.body.affectedBirds,
      symptoms: req.body.symptoms,
      diagnosis: req.body.diagnosis,
      treatmentApplied: req.body.treatmentApplied,
      dosage: req.body.dosage,
      treatmentDuration: req.body.treatmentDuration,
      observations: req.body.observations,
      quarantineEndDate: req.body.quarantineEndDate || null,
    };

    // Solo actualiza el estado si se envía
    if (active !== undefined) {
      data.active = convertirActivo(active);
    }

    const registro = await QuarantineUpdate(id, data);

    var response = new Response(true, "Registro de cuarentena actualizado exitosamente", registro);

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

const deleteQuarantine = async (req, res) => {
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

    const registro = await QuarantineDelete(id);

    var response = new Response(true, "Registro de cuarentena eliminado exitosamente", registro);

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
  getQuarantines,
  getAllQuarantinesById,
  createQuarantine,
  updateQuarantine,
  deleteQuarantine,
};
