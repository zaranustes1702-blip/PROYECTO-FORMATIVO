const {
    getAllBirdBatches,
    getIdBirdBatch,
    BirdBatchCreate,
    BirdBatchUpdate,
    BirdBatchDelete
} = require("../services/birdBatchServices");

const Response = require("../functions/response");

const getBirdBatches = async (req, res) => {

    try {

        const birdBatches = await getAllBirdBatches();

        var response = new Response(
            true,
            "Lotes de aves obtenidos exitosamente",
            birdBatches
        );

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error obteniendo lotes:", error);

        const errorResponse = new Response(
            false,
            "Error interno del servidor",
            [
                {
                    message: error.message || "Ocurrió un error inesperado"
                }
            ]
        );

        res.status(500);
        res.json(errorResponse.json);
    }
};

const getAllBirdBatchesById = async (req, res) => {

    try {

        const { id } = req.params;

        var errors = [];

        if (!id) {
            errors.push("El ID del lote es obligatorio");
        }

        if (errors.length > 0) {

            var response = new Response(
                false,
                "Error al obtener el lote",
                errors
            );

            res.status(400);
            return res.json(response.json);
        }

        const birdBatch = await getBirdBatchById(id);

        if (!birdBatch) {

            var response = new Response(
                false,
                "El lote no existe",
                []
            );

            res.status(404);
            return res.json(response.json);
        }

        var response = new Response(
            true,
            "Lote obtenido exitosamente",
            birdBatch
        );

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error obteniendo lote:", error);

        const errorResponse = new Response(
            false,
            "Error interno del servidor",
            [
                {
                    message: error.message || "Ocurrió un error inesperado"
                }
            ]
        );

        res.status(500);
        res.json(errorResponse.json);
    }
};

const createBirdBatch = async (req, res) => {

    try {

        const {
            entryDate,
            batchNumber,
            birdQuantity,
            batchWeight,
            birdAgeWeeks,
            appliedVaccines
        } = req.body;

        var errors = [];

        if (!entryDate) {
            errors.push("La fecha de ingreso es obligatoria");
        }

        if (!batchNumber || batchNumber.trim() === "") {
            errors.push("El número del lote es obligatorio");
        }

        if (!birdQuantity) {
            errors.push("La cantidad de aves es obligatoria");
        }

        if (!batchWeight) {
            errors.push("El peso del lote es obligatorio");
        }

        if (!birdAgeWeeks) {
            errors.push("La edad de las aves es obligatoria");
        }

        if (!appliedVaccines || appliedVaccines.trim() === "") {
            errors.push("Las vacunas aplicadas son obligatorias");
        }

        if (errors.length > 0) {

            var response = new Response(
                false,
                "Error al crear el lote",
                errors
            );

            res.status(400);
            return res.json(response.json);
        }

        const data = {
            entryDate,
            batchNumber,
            birdQuantity,
            batchWeight,
            birdAgeWeeks,
            appliedVaccines
        };

        const birdBatch = await BirdBatchCreate(data);

        var response = new Response(
            true,
            "Lote creado exitosamente",
            birdBatch
        );

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error creando lote:", error);

        const errorResponse = new Response(
            false,
            "Error interno del servidor",
            [
                {
                    message: error.message || "Ocurrió un error inesperado"
                }
            ]
        );

        res.status(500);
        res.json(errorResponse.json);
    }
};

const updateBirdBatch = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            entryDate,
            batchNumber,
            birdQuantity,
            batchWeight,
            birdAgeWeeks,
            appliedVaccines
        } = req.body;

        var errors = [];

        if (!id) {
            errors.push("El ID del lote es obligatorio");
        }

        if (!entryDate) {
            errors.push("La fecha de ingreso es obligatoria");
        }

        if (!batchNumber || batchNumber.trim() === "") {
            errors.push("El número del lote es obligatorio");
        }

        if (!birdQuantity) {
            errors.push("La cantidad de aves es obligatoria");
        }

        if (!batchWeight) {
            errors.push("El peso del lote es obligatorio");
        }

        if (!birdAgeWeeks) {
            errors.push("La edad de las aves es obligatoria");
        }

        if (!appliedVaccines || appliedVaccines.trim() === "") {
            errors.push("Las vacunas aplicadas son obligatorias");
        }

        if (errors.length > 0) {

            var response = new Response(
                false,
                "Error al actualizar el lote",
                errors
            );

            res.status(400);
            return res.json(response.json);
        }

        const data = {
            entryDate,
            batchNumber,
            birdQuantity,
            batchWeight,
            birdAgeWeeks,
            appliedVaccines
        };

        const birdBatch = await BirdBatchUpdate(id, data);

        var response = new Response(
            true,
            "Lote actualizado exitosamente",
            birdBatch
        );

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error actualizando lote:", error);

        const errorResponse = new Response(
            false,
            "Error interno del servidor",
            [
                {
                    message: error.message || "Ocurrió un error inesperado"
                }
            ]
        );

        res.status(500);
        res.json(errorResponse.json);
    }
};

const deleteBirdBatch = async (req, res) => {

    try {

        const { id } = req.params;

        var errors = [];

        if (!id) {
            errors.push("El ID del lote es obligatorio");
        }

        if (errors.length > 0) {

            var response = new Response(
                false,
                "Error al eliminar el lote",
                errors
            );

            res.status(400);
            return res.json(response.json);
        }

        const birdBatch = await BirdBatchDelete(id);

        var response = new Response(
            true,
            "Lote eliminado exitosamente",
            birdBatch
        );

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error eliminando lote:", error);

        const errorResponse = new Response(
            false,
            "Error interno del servidor",
            [
                {
                    message: error.message || "Ocurrió un error inesperado"
                }
            ]
        );

        res.status(500);
        res.json(errorResponse.json);
    }
};

module.exports = {
    getBirdBatches,
    getAllBirdBatchesById,
    createBirdBatch,
    updateBirdBatch,
    deleteBirdBatch
};