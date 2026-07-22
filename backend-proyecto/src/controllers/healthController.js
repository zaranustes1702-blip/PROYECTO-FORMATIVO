const {
    getAllHealths,
    getHealthById,
    HealthCreate,
    HealthUpdate,
    HealthDelete
} = require("../services/healthServices");

const Response = require("../functions/response");

const getAllHealth = async (req, res) => {
    try{
        const healths = await getAllHealths();
        
        var response = new Response(
            true, 
            "Registros sanitarios obtenidos exitosamente", 
            healths
        ); 
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error obteniendo registros sanitarios:", error);
        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};



const getAllHealthsById = async (req, res) => {
    try {

        const { id } = req.params;
        var errors = [];

        if (!id) {
            errors.push("El ID del registro sanitario es obligatorio");
        }

        if (errors.length > 0) {
            var response = new Response(false, "Error al obtener el registro sanitario", errors);
            res.status(400);
            res.json(response.json);
            return;
        }
    
        const health = await getHealthById(id);
        // Validación de existencia del ID
        if (!health) {
            var response = new Response(
                false,
                "El registro sanitario no existe",
                []
            );

            res.status(404);
            res.json(response.json);
            return;
        }


        var response = new Response(true, "Registro sanitario obtenido exitosamente", health);

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error obteniendo registro sanitario:", error);

        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);

        res.status(500);
        res.json(errorResponse.json);
    }
};

const createHealth = async (req, res) => {

    try {

        const {
        detectionDate,
        affectedBatch,
        symptoms,
        diagnosis,
        treatmentApplied,
        responsiblePerson,
        observations,
        recoveryDate
        } = req.body;

        var errors = [];

        if (!detectionDate || detectionDate.trim() === "") {
            errors.push("La fecha de detección no puede estar vacía");
        }

        if (!affectedBatch || affectedBatch.trim() === "") {
            errors.push("El lote afectado no puede estar vacío");
        }

        if (!symptoms || symptoms.trim() === "") {
            errors.push("Los síntomas no pueden estar vacíos");
        }

        if (!diagnosis || diagnosis.trim() === "") {
            errors.push("El diagnóstico no puede estar vacío");
        }

        if (!treatmentApplied || treatmentApplied.trim() === "") {
            errors.push("El tratamiento aplicado no puede estar vacío");
        }

        if (!responsiblePerson || responsiblePerson.trim() === "") {
            errors.push("La persona responsable no puede estar vacía");
        }
        if (!observations || observations.trim() === "") {
            errors.push("Las observaciones no pueden estar vacías");
        }
        if (!recoveryDate || recoveryDate.trim() === "") {
            errors.push("La fecha de recuperación no puede estar vacía");
        }


        if (errors.length > 0) {

            var response = new Response(false, "Error al crear el registro sanitario", errors);

            res.status(400);
            res.json(response.json);
            return;
        }

        const data = {
            detectionDate,
            affectedBatch,
            symptoms,
            diagnosis,
            treatmentApplied,
            responsiblePerson,
            observations,
            recoveryDate
        };

        const health = await HealthCreate(data);

        var response = new Response(true, "Registro sanitario creado exitosamente", health);

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error en crear registro sanitario:", error);

        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);

        res.status(500);
        res.json(errorResponse.json);
    }
};

const updateHealth = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            detectionDate,
            affectedBatch,
            symptoms,
            diagnosis,
            treatmentApplied,
            responsiblePerson,
            observations,
            recoveryDate
        } = req.body;

        var errors = [];

        if (!id) {
            errors.push("El ID del registro sanitario es obligatorio");
        }

        if (!detectionDate || detectionDate.trim() === "") {
            errors.push("La fecha de detección no puede estar vacía");
        }

        if (!affectedBatch || affectedBatch.trim() === "") {
            errors.push("El lote afectado no puede estar vacío");
        }

        if (!symptoms || symptoms.trim() === "") {
            errors.push("Los síntomas no pueden estar vacíos");
        }

        if (!diagnosis || diagnosis.trim() === "") {
            errors.push("El diagnóstico no puede estar vacío");
        }

        if (!treatmentApplied || treatmentApplied.trim() === "") {
            errors.push("El tratamiento aplicado no puede estar vacío");
        }

        if (!responsiblePerson || responsiblePerson.trim() === "") {
            errors.push("La persona responsable no puede estar vacía");
        }
        if (!observations || observations.trim() === "") {
            errors.push("Las observaciones no pueden estar vacías");
        }
        if (!recoveryDate || recoveryDate.trim() === "") {
            errors.push("La fecha de recuperación no puede estar vacía");
        }

        if (errors.length > 0) {

            var response = new Response(false, "Error al actualizar el registro sanitario", errors);

            res.status(400);
            return res.json(response.json);
            return;
        }

        const data = {
            detectionDate,
            affectedBatch,
            symptoms,
            diagnosis,
            treatmentApplied,
            responsiblePerson,
            observations,
            recoveryDate
        };

        const health = await HealthUpdate(id, data);

        var response = new Response(true, "Registro sanitario actualizado exitosamente", health);

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error en actualizar registro sanitario:", error);

        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);

        res.status(500);
        res.json(errorResponse.json);
    }
};

const deleteHealth = async (req, res) => {

    try {

        const { id } = req.params;

        var errors = [];

        if (!id) {
            errors.push("El ID del registro sanitario es obligatorio");
        }

        if (errors.length > 0) {

            var response = new Response(false, "Error al eliminar el registro sanitario", errors);

            res.status(400);
            return res.json(response.json);
            return;
        }
        data = { id };
        const health = await HealthDelete(id);

        var response = new Response(true, "Registro sanitario eliminado exitosamente", health);

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error al eliminar registro sanitario:", error);

        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);

        res.status(500);
        res.json(errorResponse.json);
    }
};

module.exports = {
    getAllHealth,
    getAllHealthsById,
    createHealth,
    updateHealth,
    deleteHealth
};