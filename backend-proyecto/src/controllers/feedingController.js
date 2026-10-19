const {
  getAllFeedings,
  getFeedingById,
  FeedingCreate,
  FeedingUpdate,
  FeedingDelete,
} = require("../services/feedingServices");

const { getSupplyById } = require("../services/supplyServices");
const { getStockEntryById } = require("../services/stockEntryServices");
const { getResponsibleById } = require("../services/responsibleServices");

const Response = require("../functions/response");

// Convierte el estado recibido (true/false o "true"/"false") a booleano
const convertirActivo = (valor) => valor === true || valor === "true";

// Revisa los datos de la alimentación y devuelve la lista de errores.
// `actual` es la alimentación que se está editando (solo en update).
const revisarDatos = async (body, actual) => {
  const {
    id_supply,
    id_stockEntry,
    id_responsable,
    shift,
    feedingDate,
    feedingTime,
    quantity,
  } = body;

  var errors = [];

  if (!id_supply) {
    errors.push("El insumo es obligatorio");
  }

  if (!id_stockEntry) {
    errors.push("La entrada de stock es obligatoria");
  }

  if (!id_responsable) {
    errors.push("El responsable es obligatorio");
  }

  if (shift !== "Mañana" && shift !== "Tarde" && shift !== "Noche") {
    errors.push("La jornada debe ser Mañana, Tarde o Noche");
  }

  if (!feedingDate) {
    errors.push("La fecha es obligatoria");
  }

  if (!feedingTime) {
    errors.push("La hora es obligatoria");
  }

  if (!quantity || quantity <= 0) {
    errors.push("La cantidad debe ser mayor a 0");
  }

  // Si falta algo no se siguen revisando las relaciones
  if (errors.length > 0) {
    return errors;
  }

  // El insumo debe existir, estar activo y ser de alimentacion
  const insumo = await getSupplyById(id_supply);

  if (!insumo) {
    errors.push("El insumo seleccionado no existe");
  } else if (insumo.supplyType !== "alimentacion") {
    errors.push("El insumo seleccionado no es de tipo alimentacion");
  } else if (!insumo.active) {
    errors.push("El insumo seleccionado está inactivo");
  }

  // El responsable debe existir y estar activo
  const responsable = await getResponsibleById(id_responsable);

  if (!responsable) {
    errors.push("El responsable seleccionado no existe");
  } else if (!responsable.active) {
    errors.push("El responsable seleccionado está inactivo");
  }

  // La entrada de stock debe ser del insumo y tener disponible
  const entrada = await getStockEntryById(id_stockEntry);

  if (!entrada) {
    errors.push("La entrada de stock seleccionada no existe");
  } else {
    var disponible = Number(entrada.disponible_entrada);
    var mismaEntrada = actual && Number(actual.id_stockEntry) === Number(id_stockEntry);

    // Si se edita la misma entrada, primero se devuelve lo que ya tenía
    if (mismaEntrada) {
      disponible = disponible + Number(actual.quantity);
    }

    if (entrada.id_supply !== id_supply) {
      errors.push("La entrada de stock no pertenece al insumo seleccionado");
    } else if (!mismaEntrada && !entrada.active) {
      errors.push("La entrada de stock seleccionada está inactiva");
    } else if (Number(quantity) > disponible) {
      errors.push(
        "La cantidad supera lo disponible en la entrada (" + disponible + " " + entrada.unid_entrada + ")",
      );
    }
  }

  return errors;
};

const getFeedings = async (req, res) => {
  try {
    const querylimit = req.query.limit;
    const queryoffset = req.query.offset;
    const limit = querylimit ? parseInt(querylimit) : 10;
    const offset = queryoffset ? parseInt(queryoffset) : 0;

    const feedings = await getAllFeedings(limit, offset);

    const response = new Response(
      true,
      "Alimentaciones obtenidas exitosamente",
      feedings,
    );

    res.status(200);
    res.json(response.json);
  } catch (error) {
    console.error("Error obteniendo alimentaciones:", error);
    const errorResponse = new Response(false, "Error interno del servidor", [
      { message: error.message || "Ocurrió un error inesperado" },
    ]);
    res.status(500);
    res.json(errorResponse.json);
  }
};

const getAllFeedingsById = async (req, res) => {
  try {
    const { id } = req.params;
    var errors = [];

    if (!id) {
      errors.push("El ID de la alimentación es obligatorio");
    }

    if (errors.length > 0) {
      var response = new Response(false, "Error al obtener la alimentación", errors);
      res.status(400);
      res.json(response.json);
      return;
    }

    const feeding = await getFeedingById(id);

    // Validación de existencia del ID
    if (!feeding) {
      var response = new Response(false, "La alimentación no existe", []);

      res.status(404);
      res.json(response.json);
      return;
    }

    var response = new Response(true, "Alimentación obtenida exitosamente", feeding);

    res.status(200);
    res.json(response.json);
  } catch (error) {
    console.error("Error obteniendo alimentación:", error);

    const errorResponse = new Response(false, "Error interno del servidor", [
      { message: error.message || "Ocurrió un error inesperado" },
    ]);

    res.status(500);
    res.json(errorResponse.json);
  }
};

const createFeeding = async (req, res) => {
  try {
    const {
      id_supply,
      id_stockEntry,
      id_responsable,
      shift,
      feedingDate,
      feedingTime,
      quantity,
      active,
    } = req.body;

    var errors = await revisarDatos(req.body, null);

    if (errors.length > 0) {
      var response = new Response(false, "Error al crear la alimentación", errors);

      res.status(400);
      return res.json(response.json);
    }

    const data = {
      id_supply,
      id_stockEntry,
      id_responsable,
      shift,
      feedingDate,
      // si llega HH:MM se le agregan los segundos
      feedingTime: feedingTime.length === 5 ? feedingTime + ":00" : feedingTime,
      quantity,
      active: active === undefined ? true : convertirActivo(active),
    };

    const feeding = await FeedingCreate(data);

    var response = new Response(true, "Alimentación creada exitosamente", feeding);

    res.status(201);
    res.json(response.json);
  } catch (error) {
    console.error("Error en crear alimentación:", error);

    const errorResponse = new Response(false, "Error interno del servidor", [
      { message: error.message || "Ocurrió un error inesperado" },
    ]);

    res.status(500);
    res.json(errorResponse.json);
  }
};

const updateFeeding = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      id_supply,
      id_stockEntry,
      id_responsable,
      shift,
      feedingDate,
      feedingTime,
      quantity,
      active,
    } = req.body;

    if (!id) {
      var response = new Response(false, "Error al actualizar la alimentación", [
        "El ID de la alimentación es obligatorio",
      ]);

      res.status(400);
      return res.json(response.json);
    }

    const actual = await getFeedingById(id);

    if (!actual) {
      var response = new Response(false, "La alimentación no existe", []);

      res.status(404);
      return res.json(response.json);
    }

    var errors = await revisarDatos(req.body, actual);

    if (errors.length > 0) {
      var response = new Response(false, "Error al actualizar la alimentación", errors);

      res.status(400);
      return res.json(response.json);
    }

    const data = {
      id_supply,
      id_stockEntry,
      id_responsable,
      shift,
      feedingDate,
      feedingTime: feedingTime.length === 5 ? feedingTime + ":00" : feedingTime,
      quantity,
    };

    // Solo actualiza el estado si se envía
    if (active !== undefined) {
      data.active = convertirActivo(active);
    }

    const feeding = await FeedingUpdate(id, data);

    var response = new Response(true, "Alimentación actualizada exitosamente", feeding);

    res.status(200);
    res.json(response.json);
  } catch (error) {
    console.error("Error en actualizar alimentación:", error);

    const errorResponse = new Response(false, "Error interno del servidor", [
      { message: error.message || "Ocurrió un error inesperado" },
    ]);

    res.status(500);
    res.json(errorResponse.json);
  }
};

const deleteFeeding = async (req, res) => {
  try {
    const { id } = req.params;

    var errors = [];

    if (!id) {
      errors.push("El ID de la alimentación es obligatorio");
    }

    if (errors.length > 0) {
      var response = new Response(false, "Error al eliminar la alimentación", errors);

      res.status(400);
      return res.json(response.json);
    }

    const actual = await getFeedingById(id);

    if (!actual) {
      var response = new Response(false, "La alimentación no existe", []);

      res.status(404);
      return res.json(response.json);
    }

    const feeding = await FeedingDelete(id);

    var response = new Response(true, "Alimentación eliminada exitosamente", feeding);

    res.status(200);
    res.json(response.json);
  } catch (error) {
    console.error("Error en eliminar alimentación:", error);

    const errorResponse = new Response(false, "Error interno del servidor", [
      { message: error.message || "Ocurrió un error inesperado" },
    ]);

    res.status(500);
    res.json(errorResponse.json);
  }
};

module.exports = {
  getFeedings,
  getAllFeedingsById,
  createFeeding,
  updateFeeding,
  deleteFeeding,
};
