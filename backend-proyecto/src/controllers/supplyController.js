const {
  getAllSupplies,
  getSupplyById,
  supplyCreate,
  supplyUpdate,
  supplyDelete,
} = require("../services/supplyServices");

const { countStockEntriesBySupply } = require("../services/stockEntryServices");

const Response = require("../functions/response");

// Convierte el estado recibido (true/false o "true"/"false") a booleano
const convertirActivo = (valor) => valor === true || valor === "true";

const getSupplies = async (req, res) => {
  try {
    const querylimit = req.query.limit;
    const queryoffset = req.query.offset;
    const limit = querylimit ? parseInt(querylimit) : 10;
    const offset = queryoffset ? parseInt(queryoffset) : 0;

    const supplies = await getAllSupplies(limit, offset);

    const response = new Response(
      true,
      "Insumos obtenidos exitosamente",
      supplies,
    );

    res.status(200);
    res.json(response.json);
  } catch (error) {
    console.error("Error obteniendo insumos:", error);
    const errorResponse = new Response(false, "Error interno del servidor", [
      { message: error.message || "Ocurrió un error inesperado" },
    ]);
    res.status(500);
    res.json(errorResponse.json);
  }
};

const getAllSuppliesById = async (req, res) => {
  try {
    const { id } = req.params;
    var errors = [];

    if (!id) {
      errors.push("El ID del insumo es obligatorio");
    }

    if (errors.length > 0) {
      var response = new Response(false, "Error al obtener el insumo", errors);
      res.status(400);
      res.json(response.json);
      return;
    }

    const supply = await getSupplyById(id);

    // Validación de existencia del ID
    if (!supply) {
      var response = new Response(false, "El insumo no existe", []);

      res.status(404);
      res.json(response.json);
      return;
    }

    var response = new Response(true, "Insumo obtenido exitosamente", supply);

    res.status(200);
    res.json(response.json);
  } catch (error) {
    console.error("Error obteniendo insumo:", error);

    const errorResponse = new Response(false, "Error interno del servidor", [
      { message: error.message || "Ocurrió un error inesperado" },
    ]);

    res.status(500);
    res.json(errorResponse.json);
  }
};

const createSupply = async (req, res) => {
  try {
    const {
      id_supply,
      supplyName,
      supplyType,
      reference,
      minimumStock,
      observations,
      active,
    } = req.body;

    var errors = [];

    if (!id_supply || id_supply.trim() === "") {
      errors.push("El ID del insumo es obligatorio");
    }

    if (!supplyName || supplyName.trim() === "") {
      errors.push("El nombre del insumo es obligatorio");
    }

    // Solo se manejan dos tipos de insumo
    if (supplyType !== "medicamentos" && supplyType !== "alimentacion") {
      errors.push("El tipo de insumo debe ser medicamentos o alimentacion");
    }

    if (!reference || reference.trim() === "") {
      errors.push("La referencia es obligatoria");
    }

    if (minimumStock === undefined || minimumStock === "" || minimumStock < 0) {
      errors.push("El stock mínimo es obligatorio y no puede ser negativo");
    }

    if (errors.length > 0) {
      var response = new Response(false, "Error al crear el insumo", errors);

      res.status(400);
      return res.json(response.json);
    }

    // El ID no se puede repetir
    const existente = await getSupplyById(id_supply.trim());

    if (existente) {
      var response = new Response(false, "Error al crear el insumo", [
        "Ya existe un insumo con ese ID",
      ]);

      res.status(400);
      return res.json(response.json);
    }

    const data = {
      id_supply: id_supply.trim(),
      supplyName,
      supplyType,
      reference,
      minimumStock,
      observations,
      active: active === undefined ? true : convertirActivo(active),
    };

    const supply = await supplyCreate(data);

    var response = new Response(true, "Insumo creado exitosamente", supply);

    res.status(201);
    res.json(response.json);
  } catch (error) {
    console.error("Error en crear insumo:", error);

    const errorResponse = new Response(false, "Error interno del servidor", [
      { message: error.message || "Ocurrió un error inesperado" },
    ]);

    res.status(500);
    res.json(errorResponse.json);
  }
};

const updateSupply = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      supplyName,
      supplyType,
      reference,
      minimumStock,
      observations,
      active,
    } = req.body;

    var errors = [];

    if (!id) {
      errors.push("El ID del insumo es obligatorio");
    }

    if (!supplyName || supplyName.trim() === "") {
      errors.push("El nombre del insumo es obligatorio");
    }

    if (supplyType !== "medicamentos" && supplyType !== "alimentacion") {
      errors.push("El tipo de insumo debe ser medicamentos o alimentacion");
    }

    if (!reference || reference.trim() === "") {
      errors.push("La referencia es obligatoria");
    }

    if (minimumStock === undefined || minimumStock === "" || minimumStock < 0) {
      errors.push("El stock mínimo es obligatorio y no puede ser negativo");
    }

    if (errors.length > 0) {
      var response = new Response(false, "Error al actualizar el insumo", errors);

      res.status(400);
      return res.json(response.json);
    }

    const existente = await getSupplyById(id);

    if (!existente) {
      var response = new Response(false, "El insumo no existe", []);

      res.status(404);
      return res.json(response.json);
    }

    const data = {
      supplyName,
      supplyType,
      reference,
      minimumStock,
      observations,
    };

    // Solo actualiza el estado si se envía
    if (active !== undefined) {
      data.active = convertirActivo(active);
    }

    const supply = await supplyUpdate(id, data);

    var response = new Response(true, "Insumo actualizado exitosamente", supply);

    res.status(200);
    res.json(response.json);
  } catch (error) {
    console.error("Error en actualizar insumo:", error);

    const errorResponse = new Response(false, "Error interno del servidor", [
      { message: error.message || "Ocurrió un error inesperado" },
    ]);

    res.status(500);
    res.json(errorResponse.json);
  }
};

const deleteSupply = async (req, res) => {
  try {
    const { id } = req.params;

    var errors = [];

    if (!id) {
      errors.push("El ID del insumo es obligatorio");
    }

    if (errors.length > 0) {
      var response = new Response(false, "Error al eliminar el insumo", errors);

      res.status(400);
      return res.json(response.json);
    }

    // No se puede eliminar un insumo que ya tiene entradas de stock
    const entradas = await countStockEntriesBySupply(id);

    if (entradas > 0) {
      var response = new Response(false, "Error al eliminar el insumo", [
        "El insumo tiene entradas de stock; puede dejarlo inactivo",
      ]);

      res.status(400);
      return res.json(response.json);
    }

    const supply = await supplyDelete(id);

    var response = new Response(true, "Insumo eliminado exitosamente", supply);

    res.status(200);
    res.json(response.json);
  } catch (error) {
    console.error("Error en eliminar insumo:", error);

    const errorResponse = new Response(false, "Error interno del servidor", [
      { message: error.message || "Ocurrió un error inesperado" },
    ]);

    res.status(500);
    res.json(errorResponse.json);
  }
};

module.exports = {
  getSupplies,
  getAllSuppliesById,
  createSupply,
  updateSupply,
  deleteSupply,
};
