const {
    getAllFeedings,
    getFeedingById,
    FeedingCreate,
    FeedingUpdate,
    FeedingDelete
} = require("../services/feedingServices");

const Response = require("../functions/response");

const getFeedings = async (req, res) => {
    try{
        const feedings = await getAllFeedings();

        var response = new Response(
            true,
            "Alimentaciones obtenidas exitosamente",
            feedings
        );
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error obteniendo alimentaciones:", error);
        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
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
            var response = new Response(
                false,
                "La alimentación no existe",
                []
            );

            res.status(404);
            res.json(response.json);
            return;
        }


        var response = new Response(true, "Alimentación obtenida exitosamente", feeding);

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error obteniendo alimentación:", error);

        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);

        res.status(500);
        res.json(errorResponse.json);
    }
};

const createFeeding = async (req, res) => {

    try {

        const {
        feedingDate,
        dailyConsumptionKg,
        remainingKg,
        remainingBags,
        responsiblePerson,
        shift
        } = req.body;

        var errors = [];

        if (!feedingDate || feedingDate.trim() === "") {
            errors.push("La fecha de alimentación es obligatoria");
        }

        if (!dailyConsumptionKg) {
            errors.push("El consumo diario en kg es obligatorio");
        }

        if (remainingKg === undefined || remainingKg === null) {
            errors.push("Los kg restantes son obligatorios");
        }

        if (remainingBags === undefined || remainingBags === null) {
            errors.push("Los bultos restantes son obligatorios");
        }

        if (!responsiblePerson || responsiblePerson.trim() === "") {
            errors.push("La persona responsable es obligatoria");
        }

        if (!shift || shift.trim() === "") {
            errors.push("El turno es obligatorio");
        }

        if (errors.length > 0) {

            var response = new Response(false, "Error al crear la alimentación", errors);

            res.status(400);
            return res.json(response.json);
        }

        const data = {
            feedingDate,
            dailyConsumptionKg,
            remainingKg,
            remainingBags,
            responsiblePerson,
            shift
        };

        const feeding = await FeedingCreate(data);

        var response = new Response(true, "Alimentación creada exitosamente", feeding);

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error en crear alimentación:", error);

        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);

        res.status(500);
        res.json(errorResponse.json);
    }
};

const updateFeeding = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            feedingDate,
            dailyConsumptionKg,
            remainingKg,
            remainingBags,
            responsiblePerson,
            shift
        } = req.body;

        var errors = [];

        if (!id) {
            errors.push("El ID de la alimentación es obligatorio");
        }

        if (!feedingDate || feedingDate.trim() === "") {
            errors.push("La fecha de alimentación es obligatoria");
        }

        if (!dailyConsumptionKg) {
            errors.push("El consumo diario en kg es obligatorio");
        }

        if (remainingKg === undefined || remainingKg === null) {
            errors.push("Los kg restantes son obligatorios");
        }

        if (remainingBags === undefined || remainingBags === null) {
            errors.push("Los bultos restantes son obligatorios");
        }

        if (!responsiblePerson || responsiblePerson.trim() === "") {
            errors.push("La persona responsable es obligatoria");
        }

        if (!shift || shift.trim() === "") {
            errors.push("El turno es obligatorio");
        }

        if (errors.length > 0) {

            var response = new Response(false, "Error al actualizar la alimentación", errors);

            res.status(400);
            return res.json(response.json);
        }

        const data = {
            feedingDate,
            dailyConsumptionKg,
            remainingKg,
            remainingBags,
            responsiblePerson,
            shift
        };

        const feeding = await FeedingUpdate(id, data);

        var response = new Response(true, "Alimentación actualizada exitosamente", feeding);

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error en actualizar alimentación:", error);

        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
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

        const feeding = await FeedingDelete(id);

        var response = new Response(true, "Alimentación eliminada exitosamente", feeding);

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error en eliminar alimentación:", error);

        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
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
    deleteFeeding
};
