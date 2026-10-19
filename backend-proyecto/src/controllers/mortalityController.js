const {
  getAllMortalities,
  getMortalityById,
  MortalityCreate,
  MortalityUpdate,
  MortalityDelete,
} = require("../services/mortalityServices");

const { getIdBirdBatch } = require("../services/birdBatchServices");
const { getResponsibleById } = require("../services/responsibleServices");

const Response = require("../functions/response");

// Convierte el estado recibido (true/false o "true"/"false") a booleano
const convertirActivo = (valor) => valor === true || valor === "true";

// Revisa los datos recibidos y devuelve la lista de errores
const revisarDatos = async (body) => {
  const {
    id_lote,
    id_responsable,
    mortalityDate,
    mortalityTime,
    dailyMortality,
    possibleCauseOfDeath,
    necropsyPerformed,
  } = body;

  var errors = [];

  if (!id_lote) {
    errors.push("El lote es obligatorio");
  }

  if (!id_responsable) {
    errors.push("El responsable es obligatorio");
  }

  if (!mortalityDate) {
    errors.push("La fecha de mortalidad es obligatoria");
  }

  if (!mortalityTime) {
    errors.push("La hora de mortalidad es obligatoria");
  }

  if (dailyMortality === undefined || dailyMortality === "" || dailyMortality < 0) {
    errors.push("La mortalidad diaria es obligatoria y no puede ser negativa");
  }

  if (!possibleCauseOfDeath || possibleCauseOfDeath.trim() === "") {
    errors.push("La posible causa de muerte es obligatoria");
  }

  if (necropsyPerformed === undefined || necropsyPerformed === null) {
    errors.push("El campo necropsia realizada es obligatorio");
  }

  // El lote debe existir
  if (id_lote) {
    const lote = await getIdBirdBatch(id_lote);

    if (!lote) {
      errors.push("El lote seleccionado no existe");
    }
  }

  // el responsable debe existir
  if (id_responsable) {
    const responsable = await getResponsibleById(id_responsable);

    if (!responsable) {
      errors.push("El responsable seleccionado no existe");
    }
  }
  return errors;
};

const getMortalities = async (req, res) => {
  try {
    const querylimit = req.query.limit;
    const queryoffset = req.query.offset;
    const limit = querylimit ? parseInt(querylimit) : 10;
    const offset = queryoffset ? parseInt(queryoffset) : 0;

    const lista = await getAllMortalities(limit, offset);

    const response = new Response(
      true,
      "Registros de mortalidad obtenidos exitosamente",
      lista,
    );

    res.status(200);
    res.json(response.json);
  } catch (error) {
    console.error("Error obteniendo registros de mortalidad:", error);
    const errorResponse = new Response(false, "Error interno del servidor", [
      { message: error.message || "Ocurrió un error inesperado" },
    ]);
    res.status(500);
    res.json(errorResponse.json);
  }
};

const getAllMortalitiesById = async (req, res) => {
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

    const registro = await getMortalityById(id);

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

const createMortality = async (req, res) => {
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
      id_responsable: req.body.id_responsable,
      mortalityDate: req.body.mortalityDate,
      mortalityTime: req.body.mortalityTime,
      dailyMortality: req.body.dailyMortality,
      possibleCauseOfDeath: req.body.possibleCauseOfDeath,
      necropsyPerformed: convertirActivo(req.body.necropsyPerformed),
      observations: req.body.observations,
    };
    data.active = active === undefined ? true : convertirActivo(active);

    const registro = await MortalityCreate(data);

    var response = new Response(true, "Registro de mortalidad creado exitosamente", registro);

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

const updateMortality = async (req, res) => {
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

    const existente = await getMortalityById(id);

    if (!existente) {
      var response = new Response(false, "El registro no existe", []);

      res.status(404);
      return res.json(response.json);
    }

    const data = {
      id_lote: req.body.id_lote,
      id_responsable: req.body.id_responsable,
      mortalityDate: req.body.mortalityDate,
      mortalityTime: req.body.mortalityTime,
      dailyMortality: req.body.dailyMortality,
      possibleCauseOfDeath: req.body.possibleCauseOfDeath,
      necropsyPerformed: convertirActivo(req.body.necropsyPerformed),
      observations: req.body.observations,
    };

    // Solo actualiza el estado si se envía
    if (active !== undefined) {
      data.active = convertirActivo(active);
    }

    const registro = await MortalityUpdate(id, data);

    var response = new Response(true, "Registro de mortalidad actualizado exitosamente", registro);

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

const deleteMortality = async (req, res) => {
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

    const registro = await MortalityDelete(id);

    var response = new Response(true, "Registro de mortalidad eliminado exitosamente", registro);

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
  getMortalities,
  getAllMortalitiesById,
  createMortality,
  updateMortality,
  deleteMortality,
};
