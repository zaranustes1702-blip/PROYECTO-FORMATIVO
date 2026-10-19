const {
  getAllStockEntries,
  getStockEntryById,
  stockEntryCreate,
  stockEntryUpdate,
  stockEntryDelete,
} = require("../services/stockEntryServices");

const { getSupplyById } = require("../services/supplyServices");
const { getBarnById } = require("../services/barnServices");
const { countFeedingsByStockEntry } = require("../services/feedingServices");

const Response = require("../functions/response");

// Convierte el estado recibido (true/false o "true"/"false") a booleano
const convertirActivo = (valor) => valor === true || valor === "true";

const getStockEntries = async (req, res) => {
  try {
    const querylimit = req.query.limit;
    const queryoffset = req.query.offset;
    const limit = querylimit ? parseInt(querylimit) : 10;
    const offset = queryoffset ? parseInt(queryoffset) : 0;

    const entries = await getAllStockEntries(limit, offset);

    const response = new Response(
      true,
      "Entradas de insumos obtenidas exitosamente",
      entries,
    );

    res.status(200);
    res.json(response.json);
  } catch (error) {
    console.error("Error obteniendo entradas de insumos:", error);
    const errorResponse = new Response(false, "Error interno del servidor", [
      { message: error.message || "Ocurrió un error inesperado" },
    ]);
    res.status(500);
    res.json(errorResponse.json);
  }
};

const getStockEntryDetail = async (req, res) => {
  try {
    const { id } = req.params;
    var errors = [];

    if (!id) {
      errors.push("El ID de la entrada es obligatorio");
    }

    if (errors.length > 0) {
      var response = new Response(false, "Error al obtener la entrada", errors);
      res.status(400);
      res.json(response.json);
      return;
    }

    const entry = await getStockEntryById(id);

    // Validación de existencia del ID
    if (!entry) {
      var response = new Response(false, "La entrada no existe", []);

      res.status(404);
      res.json(response.json);
      return;
    }

    var response = new Response(true, "Entrada obtenida exitosamente", entry);

    res.status(200);
    res.json(response.json);
  } catch (error) {
    console.error("Error obteniendo entrada:", error);

    const errorResponse = new Response(false, "Error interno del servidor", [
      { message: error.message || "Ocurrió un error inesperado" },
    ]);

    res.status(500);
    res.json(errorResponse.json);
  }
};

const createStockEntry = async (req, res) => {
  try {
    const {
      id_supply,
      id_barn,
      cantidad_inicial,
      unid_entrada,
      vencimiento,
      precio_unitario,
      precio_total,
      active,
    } = req.body;

    var errors = [];

    if (!id_supply) {
      errors.push("El insumo es obligatorio");
    }

    if (!id_barn) {
      errors.push("El galpón es obligatorio");
    }

    if (cantidad_inicial === undefined || cantidad_inicial === "" || cantidad_inicial < 0) {
      errors.push("La cantidad inicial es obligatoria y no puede ser negativa");
    }

    if (!unid_entrada || unid_entrada.trim() === "") {
      errors.push("El tipo de cantidad inicial es obligatorio");
    }

    if (!vencimiento) {
      errors.push("La fecha de vencimiento es obligatoria");
    }

    if (precio_unitario === undefined || precio_unitario === "" || precio_unitario < 0) {
      errors.push("El precio unitario es obligatorio y no puede ser negativo");
    }

    // El insumo y el galpón deben existir
    if (id_supply) {
      const insumo = await getSupplyById(id_supply);
      if (!insumo) {
        errors.push("El insumo seleccionado no existe");
      }
    }

    if (id_barn) {
      const galpon = await getBarnById(id_barn);
      if (!galpon) {
        errors.push("El galpón seleccionado no existe");
      }
    }

    if (errors.length > 0) {
      var response = new Response(false, "Error al crear la entrada", errors);

      res.status(400);
      return res.json(response.json);
    }

    const data = {
      id_supply,
      id_barn,
      cantidad_inicial,
      cantidad_salida: 0, // al inicio no ha salido nada
      disponible_entrada: cantidad_inicial, // al inicio todo está disponible
      unid_entrada,
      vencimiento,
      precio_unitario,
      // si no envían el total se calcula: cantidad x precio unitario
      precio_total: precio_total ? precio_total : cantidad_inicial * precio_unitario,
      active: active === undefined ? true : convertirActivo(active),
    };

    const entry = await stockEntryCreate(data);

    var response = new Response(true, "Entrada creada exitosamente", entry);

    res.status(201);
    res.json(response.json);
  } catch (error) {
    console.error("Error en crear entrada:", error);

    const errorResponse = new Response(false, "Error interno del servidor", [
      { message: error.message || "Ocurrió un error inesperado" },
    ]);

    res.status(500);
    res.json(errorResponse.json);
  }
};

const updateStockEntry = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      id_supply,
      id_barn,
      cantidad_inicial,
      unid_entrada,
      vencimiento,
      precio_unitario,
      precio_total,
      active,
    } = req.body;

    var errors = [];

    if (!id) {
      errors.push("El ID de la entrada es obligatorio");
    }

    if (!id_supply) {
      errors.push("El insumo es obligatorio");
    }

    if (!id_barn) {
      errors.push("El galpón es obligatorio");
    }

    if (cantidad_inicial === undefined || cantidad_inicial === "" || cantidad_inicial < 0) {
      errors.push("La cantidad inicial es obligatoria y no puede ser negativa");
    }

    if (!unid_entrada || unid_entrada.trim() === "") {
      errors.push("El tipo de cantidad inicial es obligatorio");
    }

    if (!vencimiento) {
      errors.push("La fecha de vencimiento es obligatoria");
    }

    if (precio_unitario === undefined || precio_unitario === "" || precio_unitario < 0) {
      errors.push("El precio unitario es obligatorio y no puede ser negativo");
    }

    if (errors.length > 0) {
      var response = new Response(false, "Error al actualizar la entrada", errors);

      res.status(400);
      return res.json(response.json);
    }

    const actual = await getStockEntryById(id);

    if (!actual) {
      var response = new Response(false, "La entrada no existe", []);

      res.status(404);
      return res.json(response.json);
    }

    // La cantidad inicial no puede ser menor a lo que ya salió
    const salida = Number(actual.cantidad_salida);

    if (Number(cantidad_inicial) < salida) {
      var response = new Response(false, "Error al actualizar la entrada", [
        "La cantidad inicial no puede ser menor a la cantidad de salida (" + salida + ")",
      ]);

      res.status(400);
      return res.json(response.json);
    }

    // Si ya tiene alimentaciones no se puede cambiar el insumo
    if (id_supply !== actual.id_supply) {
      const usos = await countFeedingsByStockEntry(id);

      if (usos > 0) {
        var response = new Response(false, "Error al actualizar la entrada", [
          "No se puede cambiar el insumo: la entrada ya tiene alimentaciones",
        ]);

        res.status(400);
        return res.json(response.json);
      }
    }

    // El insumo y el galpón deben existir
    const insumo = await getSupplyById(id_supply);
    const galpon = await getBarnById(id_barn);

    if (!insumo || !galpon) {
      var response = new Response(false, "Error al actualizar la entrada", [
        "El insumo o el galpón seleccionado no existe",
      ]);

      res.status(400);
      return res.json(response.json);
    }

    // La cantidad de salida no se envía: la controla feeding
    const data = {
      id_supply,
      id_barn,
      cantidad_inicial,
      disponible_entrada: cantidad_inicial - salida,
      unid_entrada,
      vencimiento,
      precio_unitario,
      precio_total: precio_total ? precio_total : cantidad_inicial * precio_unitario,
    };

    // Solo actualiza el estado si se envía
    if (active !== undefined) {
      data.active = convertirActivo(active);
    }

    const entry = await stockEntryUpdate(id, data);

    var response = new Response(true, "Entrada actualizada exitosamente", entry);

    res.status(200);
    res.json(response.json);
  } catch (error) {
    console.error("Error en actualizar entrada:", error);

    const errorResponse = new Response(false, "Error interno del servidor", [
      { message: error.message || "Ocurrió un error inesperado" },
    ]);

    res.status(500);
    res.json(errorResponse.json);
  }
};

const deleteStockEntry = async (req, res) => {
  try {
    const { id } = req.params;

    var errors = [];

    if (!id) {
      errors.push("El ID de la entrada es obligatorio");
    }

    if (errors.length > 0) {
      var response = new Response(false, "Error al eliminar la entrada", errors);

      res.status(400);
      return res.json(response.json);
    }

    // No se puede eliminar una entrada que ya tiene alimentaciones
    const usos = await countFeedingsByStockEntry(id);

    if (usos > 0) {
      var response = new Response(false, "Error al eliminar la entrada", [
        "La entrada tiene alimentaciones; puede dejarla inactiva",
      ]);

      res.status(400);
      return res.json(response.json);
    }

    const entry = await stockEntryDelete(id);

    var response = new Response(true, "Entrada eliminada exitosamente", entry);

    res.status(200);
    res.json(response.json);
  } catch (error) {
    console.error("Error en eliminar entrada:", error);

    const errorResponse = new Response(false, "Error interno del servidor", [
      { message: error.message || "Ocurrió un error inesperado" },
    ]);

    res.status(500);
    res.json(errorResponse.json);
  }
};

module.exports = {
  getStockEntries,
  getStockEntryDetail,
  createStockEntry,
  updateStockEntry,
  deleteStockEntry,
};
