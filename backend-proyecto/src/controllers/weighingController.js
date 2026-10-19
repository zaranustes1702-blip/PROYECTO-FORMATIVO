const {
    getAllWeighings,
    getWeighingById,
    WeighingCreate,
    WeighingUpdate,
    WeighingDelete
} = require("../services/weighingServices");

const { getIdBirdBatch } = require("../services/birdBatchServices");

const Response = require("../functions/response");

const getWeighings = async (req, res) => {
  try {
    const querylimit = req.query.limit
    const queryoffset = req.query.offset
    const limit = querylimit ? parseInt(querylimit) : 10;
    const offset = queryoffset ? parseInt(queryoffset) : 0;

    const weighings = await getAllWeighings(limit, offset);

    const response = new Response(
      true,
      "Pesos obtenidos exitosamente",
      weighings,
    );

    res.status(200);
    res.json(response.json);
  } catch (error) {
        console.error("Error obteniendo pesos:", error);
        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};


const getAllWeighingsById = async (req, res) => {
    try {

        const { id } = req.params;
        var errors = [];

        if (!id) {
            errors.push("El ID del peso es obligatorio");
        }

        if (errors.length > 0) {
            var response = new Response(false, "Error al obtener el peso", errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        
        const weighing = await getWeighingById(id);
        // Validación de existencia del ID
        if (!weighing) {
            var response = new Response(
                false,
                "El peso no existe",
                []
            );

            res.status(404);
            res.json(response.json);
            return;
        }


        var response = new Response(true, "Peso obtenido exitosamente", weighing);

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error obteniendo peso:", error);

        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);

        res.status(500);
        res.json(errorResponse.json);
    }
};

// Convierte el estado recibido (true/false o "true"/"false") a booleano
const convertirActivo = (valor) => valor === true || valor === "true";

const createWeighing = async (req, res) => {

    try {

        const {
            id_birdBatch,
            weighingDate,
            weighingTime,
            responsiblePerson,
            weighedBirds,
            totalWeightKg,
            averageWeightGrams,
            batchUniformityPercentage,
            active
        } = req.body;

        var errors = [];

        if (!id_birdBatch) {
            errors.push("El lote de aves es obligatorio");
        } else {
            const lote = await getIdBirdBatch(id_birdBatch);
            if (!lote) {
                errors.push("El lote de aves no existe");
            }
        }

        if (!weighingDate|| weighingDate.trim() === "") {
            errors.push("La fecha de la pesada es obligatoria");
        }

        if (!weighingTime || weighingTime.trim() === "") {
            errors.push("La hora de la pesada es obligatoria");
        }

        if (!responsiblePerson || responsiblePerson.trim() === "") {
            errors.push("El responsable de la pesada es obligatorio");
        }

        if (!weighedBirds) {
            errors.push("Las aves pesadas son obligatorias");
        }

        if (!totalWeightKg) {
            errors.push("El peso total en kg es obligatorio");
        }

        if (!averageWeightGrams) {
            errors.push("El peso promedio en gramos es obligatorio");
        }

        if (!batchUniformityPercentage) {
            errors.push("La uniformidad de lote es obligatoria");
        }

        if (errors.length > 0) {

            var response = new Response(false, "Error al crear el peso", errors);

            res.status(400);
            return res.json(response.json);
            return;
        }

        const data = {
            id_birdBatch,
            weighingDate,
            weighingTime,
            responsiblePerson,
            weighedBirds,
            totalWeightKg,
            averageWeightGrams,
            batchUniformityPercentage,
            active: active === undefined ? true : convertirActivo(active)
        };

        const weighing = await WeighingCreate(data);

        var response = new Response(true, "Peso creado exitosamente", weighing);

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error en crear peso:", error);

        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);

        res.status(500);
        res.json(errorResponse.json);
    }
};

const updateWeighing = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            id_birdBatch,
            weighingDate,
            weighingTime,
            responsiblePerson,
            weighedBirds,
            totalWeightKg,
            averageWeightGrams,
            batchUniformityPercentage,
            active
        } = req.body;

        var errors = [];

        if (!id) {
            errors.push("El ID del peso es obligatorio");
        }

        if (!id_birdBatch) {
            errors.push("El lote de aves es obligatorio");
        } else {
            const lote = await getIdBirdBatch(id_birdBatch);
            if (!lote) {
                errors.push("El lote de aves no existe");
            }
        }

        if (!weighingDate || weighingDate.trim() === "") {
            errors.push("La fecha de la pesada es obligatoria");
        }

        if (!weighingTime || weighingTime.trim() === "") {
            errors.push("La hora de la pesada es obligatoria");
        }

        if (!responsiblePerson || responsiblePerson.trim() === "") {
            errors.push("La persona responsable es obligatoria");
        }

        if (!weighedBirds) {
            errors.push("Las aves pesadas son obligatorias");
        }

        if (!totalWeightKg) {
            errors.push("El peso total en kg es obligatorio");
        }

        if (!averageWeightGrams) {
            errors.push("El peso promedio en gramos es obligatorio");
        }

        if (!batchUniformityPercentage) {
            errors.push("La uniformidad de lote es obligatoria");
        }

        if (errors.length > 0) {

            var response = new Response(false, "Error al actualizar el peso", errors);

            res.status(400);
            return res.json(response.json);
            return;
        }

        const data = {
            id_birdBatch,
            weighingDate,
            weighingTime,
            responsiblePerson,
            weighedBirds,
            totalWeightKg,
            averageWeightGrams,
            batchUniformityPercentage
        };

        // Solo actualiza el estado si se envía
        if (active !== undefined) {
            data.active = convertirActivo(active);
        }

        const weighing = await WeighingUpdate(id, data);

        var response = new Response(true, "Peso actualizado exitosamente", weighing);

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error en actualizar peso:", error);

        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);

        res.status(500);
        res.json(errorResponse.json);
    }
};

const deleteWeighing = async (req, res) => {

    try {

        const { id } = req.params;

        var errors = [];

        if (!id) {
            errors.push("El ID del peso es obligatorio");
        }

        if (errors.length > 0) {

            var response = new Response(false, "Error al eliminar el peso", errors);

            res.status(400);
            return res.json(response.json);
            return;
        }
        data = { id };
        const weighing = await WeighingDelete(id);

        var response = new Response(true, "Peso eliminado exitosamente", weighing);

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error en eliminar el peso:", error);

        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);

        res.status(500);
        res.json(errorResponse.json);
    }
};

module.exports = {
    getWeighings,
    getAllWeighingsById,
    createWeighing,
    updateWeighing,
    deleteWeighing
};