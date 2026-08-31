const {
  getAllBarns,
  getBarnById,
  BarnCreate,
  BarnUpdate,
  BarnDelete,
} = require("../services/barnServices");

const Response = require("../functions/response");

const getBarns = async (req, res) => {
  try {
    const querylimit = req.query.limit;
    const queryoffset = req.query.offset;
    const limit = querylimit ? parseInt(querylimit) : 10;
    const offset = queryoffset ? parseInt(queryoffset) : 0;

    const barns = await getAllBarns(limit, offset);

    const response = new Response(
      true,
      "Galpones obtenidos exitosamente",
      barns,
    );

    res.status(200);
    res.json(response.json);
  } catch (error) {
    console.error("Error obteniendo lotes:", error);
    const errorResponse = new Response(false, "Error interno del servidor", [
      { message: error.message || "Ocurrió un error inesperado" },
    ]);
    res.status(500);
    res.json(errorResponse.json);
  }
};

const getAllBarnsById = async (req, res) => {
  try {
    const { id } = req.params;
    var errors = [];

    if (!id) {
      errors.push("El ID del lote es obligatorio");
    }

    if (errors.length > 0) {
      var response = new Response(false, "Error al obtener el lote", errors);
      res.status(400);
      res.json(response.json);
      return;
    }
    const barn = await getBarnById(id);
    // Validación de existencia del ID
    if (!barn) {
      var response = new Response(false, "El lote no existe", []);

      res.status(404);
      res.json(response.json);
      return;
    }

    var response = new Response(true, "Lote obtenido exitosamente", barn);

    res.status(201);
    res.json(response.json);
  } catch (error) {
    console.error("Error obteniendo lote:", error);

    const errorResponse = new Response(false, "Error interno del servidor", [
      { message: error.message || "Ocurrió un error inesperado" },
    ]);

    res.status(500);
    res.json(errorResponse.json);
  }
};

const createBarn = async (req, res) => {
  try {
    const { barnName, barnSize, maxBirdCapacity, birdBreed } = req.body;

    var errors = [];

    if (!barnName || barnName.trim() === "") {
      errors.push("El nombre del lote es obligatorio");
    }

    if (!barnSize || barnSize.trim() === "") {
      errors.push("El tamaño del lote es obligatorio");
    }

    if (!maxBirdCapacity) {
      errors.push("La capacidad máxima de pájaros es obligatoria");
    }

    if (!birdBreed || birdBreed.trim() === "") {
      errors.push("La raza del pájaro es obligatoria");
    }

    if (errors.length > 0) {
      var response = new Response(false, "Error al crear el lote", errors);

      res.status(400);
      return res.json(response.json);
      return;
    }

    const data = {
      barnName,
      barnSize,
      maxBirdCapacity,
      birdBreed,
    };

    const barn = await BarnCreate(data);

    var response = new Response(true, "Lote creado exitosamente", barn);

    res.status(201);
    res.json(response.json);
  } catch (error) {
    console.error("Error en crear lote:", error);

    const errorResponse = new Response(false, "Error interno del servidor", [
      { message: error.message || "Ocurrió un error inesperado" },
    ]);

    res.status(500);
    res.json(errorResponse.json);
  }
};

const updateBarn = async (req, res) => {
  try {
    const { id } = req.params;

    const { barnName, barnSize, maxBirdCapacity, birdBreed } = req.body;

    var errors = [];

    if (!id) {
      errors.push("El ID del lote es obligatorio");
    }

    if (!barnName || barnName.trim() === "") {
      errors.push("El nombre del lote es obligatorio");
    }

    if (!barnSize || barnSize.trim() === "") {
      errors.push("El tamaño del lote es obligatorio");
    }

    if (!maxBirdCapacity) {
      errors.push("La capacidad máxima de pájaros es obligatoria");
    }

    if (!birdBreed || birdBreed.trim() === "") {
      errors.push("La raza del pájaro es obligatoria");
    }

    if (errors.length > 0) {
      var response = new Response(false, "Error al actualizar el lote", errors);

      res.status(400);
      return res.json(response.json);
      return;
    }

    const data = {
      barnName,
      barnSize,
      maxBirdCapacity,
      birdBreed,
    };

    const barn = await BarnUpdate(id, data);

    var response = new Response(true, "Lote actualizado exitosamente", barn);

    res.status(201);
    res.json(response.json);
  } catch (error) {
    console.error("Error en actualizar lote:", error);

    const errorResponse = new Response(false, "Error interno del servidor", [
      { message: error.message || "Ocurrió un error inesperado" },
    ]);

    res.status(500);
    res.json(errorResponse.json);
  }
};

const deleteBarn = async (req, res) => {
  try {
    const { id } = req.params;

    var errors = [];

    if (!id) {
      errors.push("El ID del lote es obligatorio");
    }

    if (errors.length > 0) {
      var response = new Response(false, "Error al eliminar el lote", errors);

      res.status(400);
      return res.json(response.json);
      return;
    }
    data = { id };
    const barn = await BarnDelete(id);

    var response = new Response(true, "Lote eliminado exitosamente", barn);

    res.status(201);
    res.json(response.json);
  } catch (error) {
    console.error("Error en eliminar lote:", error);

    const errorResponse = new Response(false, "Error interno del servidor", [
      { message: error.message || "Ocurrió un error inesperado" },
    ]);

    res.status(500);
    res.json(errorResponse.json);
  }
};

module.exports = {
  getBarns,
  getAllBarnsById,
  createBarn,
  updateBarn,
  deleteBarn,
};
