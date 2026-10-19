const {
  getAllEggProductions,
  getEggProductionById,
  EggProductionCreate,
  EggProductionUpdate,
  EggProductionDelete,
} = require("../services/eggProductionServices");

const { getIdBirdBatch } = require("../services/birdBatchServices");
const { getResponsibleById } = require("../services/responsibleServices");

const Response = require("../functions/response");

// Convierte el estado recibido (true/false o "true"/"false") a booleano
const convertirActivo = (valor) => valor === true || valor === "true";

// Jornadas permitidas
const JORNADAS = ["Mañana", "Tarde", "Noche"];

// Cantidades que se reciben del formulario (tipos de huevo en la mañana y en la tarde)
const CANTIDADES = [
  "jumboEggsAm",
  "aaaEggsAm",
  "aaEggsAm",
  "aEggsAm",
  "bEggsAm",
  "cEggsAm",
  "brokenEggsAm",
  "jumboEggsPm",
  "aaaEggsPm",
  "aaEggsPm",
  "aEggsPm",
  "bEggsPm",
  "cEggsPm",
  "brokenEggsPm",
];

// Revisa los datos recibidos y devuelve la lista de errores
const revisarDatos = async (body) => {
  const {
    id_lote,
    id_responsibleAm,
    id_responsiblePm,
    date,
    hourAm,
    hourPm,
    shift,
  } = body;

  var errors = [];

  if (!id_lote) {
    errors.push("El lote es obligatorio");
  }

  if (!id_responsibleAm) {
    errors.push("El responsable de la mañana es obligatorio");
  }

  if (!id_responsiblePm) {
    errors.push("El responsable de la tarde es obligatorio");
  }

  if (!date) {
    errors.push("La fecha es obligatoria");
  }

  if (!hourAm) {
    errors.push("La hora de la mañana es obligatoria");
  }

  if (!hourPm) {
    errors.push("La hora de la tarde es obligatoria");
  }

  if (!JORNADAS.includes(shift)) {
    errors.push("La jornada debe ser Mañana, Tarde o Noche");
  }

  // Cada cantidad debe ser un número igual o mayor a 0
  for (const campo of CANTIDADES) {
    if (body[campo] === undefined || body[campo] === "" || body[campo] < 0) {
      errors.push("La cantidad " + campo + " es obligatoria y no puede ser negativa");
    }
  }

  // El lote debe existir
  if (id_lote) {
    const lote = await getIdBirdBatch(id_lote);

    if (!lote) {
      errors.push("El lote seleccionado no existe");
    }
  }

  // el responsable de la mañana debe existir
  if (id_responsibleAm) {
    const responsable = await getResponsibleById(id_responsibleAm);

    if (!responsable) {
      errors.push("El responsable de la mañana seleccionado no existe");
    }
  }

  // el responsable de la tarde debe existir
  if (id_responsiblePm) {
    const responsable = await getResponsibleById(id_responsiblePm);

    if (!responsable) {
      errors.push("El responsable de la tarde seleccionado no existe");
    }
  }
  return errors;
};

// Calcula los totales a partir de las cantidades por tipo de huevo
const calcularTotales = async (body) => {
  const n = (campo) => Number(body[campo]) || 0;

  // Huevos buenos (sin los rotos) y total recogido en cada jornada
  const goodEggsAm =
    n("jumboEggsAm") + n("aaaEggsAm") + n("aaEggsAm") + n("aEggsAm") + n("bEggsAm") + n("cEggsAm");
  const goodEggsPm =
    n("jumboEggsPm") + n("aaaEggsPm") + n("aaEggsPm") + n("aEggsPm") + n("bEggsPm") + n("cEggsPm");

  const totalAm = goodEggsAm + n("brokenEggsAm");
  const totalPm = goodEggsPm + n("brokenEggsPm");

  // Totales del día
  const brokenEggs = n("brokenEggsAm") + n("brokenEggsPm");
  const goodEggs = goodEggsAm + goodEggsPm;
  const totalDay = totalAm + totalPm;

  // Porcentaje de producción = huevos del día / aves del lote x 100
  const lote = await getIdBirdBatch(body.id_lote);
  const aves = lote ? Number(lote.birdQuantity) : 0;
  const productionPercentage = aves > 0 ? Number(((totalDay / aves) * 100).toFixed(2)) : 0;

  return {
    goodEggsAm,
    totalAm,
    goodEggsPm,
    totalPm,
    brokenEggs,
    goodEggs,
    totalDay,
    productionPercentage,
  };
};

const getEggProductions = async (req, res) => {
  try {
    const querylimit = req.query.limit;
    const queryoffset = req.query.offset;
    const limit = querylimit ? parseInt(querylimit) : 10;
    const offset = queryoffset ? parseInt(queryoffset) : 0;

    const lista = await getAllEggProductions(limit, offset);

    const response = new Response(
      true,
      "Producciones de huevos obtenidas exitosamente",
      lista,
    );

    res.status(200);
    res.json(response.json);
  } catch (error) {
    console.error("Error obteniendo producciones de huevos:", error);
    const errorResponse = new Response(false, "Error interno del servidor", [
      { message: error.message || "Ocurrió un error inesperado" },
    ]);
    res.status(500);
    res.json(errorResponse.json);
  }
};

const getAllEggProductionsById = async (req, res) => {
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

    const registro = await getEggProductionById(id);

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

const createEggProduction = async (req, res) => {
  try {
    const { active } = req.body;

    var errors = await revisarDatos(req.body);

    if (errors.length > 0) {
      var response = new Response(false, "Error al crear el registro", errors);

      res.status(400);
      return res.json(response.json);
    }

    const cantidades = {};
    for (const campo of CANTIDADES) {
      cantidades[campo] = Number(req.body[campo]);
    }
    const totales = await calcularTotales(req.body);

    const data = {
      id_lote: req.body.id_lote,
      id_responsibleAm: req.body.id_responsibleAm,
      id_responsiblePm: req.body.id_responsiblePm,
      date: req.body.date,
      hourAm: req.body.hourAm,
      hourPm: req.body.hourPm,
      shift: req.body.shift,
      observations: req.body.observations,
      ...cantidades,
      ...totales,
    };
    data.active = active === undefined ? true : convertirActivo(active);

    const registro = await EggProductionCreate(data);

    var response = new Response(true, "Producción de huevos creada exitosamente", registro);

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

const updateEggProduction = async (req, res) => {
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

    const existente = await getEggProductionById(id);

    if (!existente) {
      var response = new Response(false, "El registro no existe", []);

      res.status(404);
      return res.json(response.json);
    }

    const cantidades = {};
    for (const campo of CANTIDADES) {
      cantidades[campo] = Number(req.body[campo]);
    }
    const totales = await calcularTotales(req.body);

    const data = {
      id_lote: req.body.id_lote,
      id_responsibleAm: req.body.id_responsibleAm,
      id_responsiblePm: req.body.id_responsiblePm,
      date: req.body.date,
      hourAm: req.body.hourAm,
      hourPm: req.body.hourPm,
      shift: req.body.shift,
      observations: req.body.observations,
      ...cantidades,
      ...totales,
    };

    // Solo actualiza el estado si se envía
    if (active !== undefined) {
      data.active = convertirActivo(active);
    }

    const registro = await EggProductionUpdate(id, data);

    var response = new Response(true, "Producción de huevos actualizada exitosamente", registro);

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

const deleteEggProduction = async (req, res) => {
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

    const registro = await EggProductionDelete(id);

    var response = new Response(true, "Producción de huevos eliminada exitosamente", registro);

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
  getEggProductions,
  getAllEggProductionsById,
  createEggProduction,
  updateEggProduction,
  deleteEggProduction,
};
