const {
    getAllQuarantines,
    getQuarantineById,
    QuarantineCreate,
    QuarantineUpdate,
    QuarantineDelete
} = require("../services/quarantineServices");

const Response = require("../functions/response");

const getQuarantines = async (req, res) => {
    try{
        const quarantines = await getAllQuarantines();
        
        var response = new Response(
            true, 
            "Cuarentenas obtenidas exitosamente", 
            quarantines
        ); 
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error obteniendo cuarentenas:", error);
        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

const getAllQuarantinesById = async (req, res) => {
    try {

        const { id } = req.params;
        var errors = [];

        if (!id) {
            errors.push("El ID de la cuarentena es obligatorio");
        }

        if (errors.length > 0) {
            var response = new Response(false, "Error al obtener la cuarentena", errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        
        const quarantine = await getQuarantineById(id);

        // Validación de existencia del ID
        if (!quarantine) {
            var response = new Response(
                false,
                "La cuarentena no existe",
                []
            );

            res.status(404);
            res.json(response.json);
            return;
        }

        var response = new Response(true, "Cuarentena obtenida exitosamente", quarantine);

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error obteniendo cuarentena:", error);

        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);

        res.status(500);
        res.json(errorResponse.json);
    }
};

const createQuarantine = async (req, res) => {

    try {

        const {
        quarantineDate,
        affectedBirds,
        symptoms,
        diagnosis,
        treatmentApplied,
        dosage,
        treatmentDuration,
        observations,
        quarantineEndDate
        } = req.body;

        var errors = [];

        if (!quarantineDate || quarantineDate.trim() === "") {
            errors.push("La fecha de la cuarentena es obligatoria");
        }

        if (!affectedBirds) {
            errors.push("Las aves afectadas son obligatorias");
        }

        if (!symptoms || symptoms.trim() === "") {
            errors.push("Los síntomas son obligatorios");
        }

        if (!diagnosis || diagnosis.trim() === "") {
            errors.push("El diagnóstico es obligatorio");
        }

        if (!treatmentApplied || treatmentApplied.trim() === "") {
            errors.push("El tratamiento aplicado es obligatorio");
        }

        if (!dosage || dosage.trim() === "") {
            errors.push("La dosis es obligatoria");
        }

        if (!treatmentDuration || treatmentDuration.trim() === "") {
            errors.push("La duración del tratamiento es obligatoria");
        }
        if (observations && observations.trim() === "") {
            errors.push("Las observaciones no pueden estar vacías");
        }
        if (quarantineEndDate && quarantineEndDate.trim() === "") {
            errors.push("La fecha de finalización de la cuarentena no puede estar vacía");
        }

        if (errors.length > 0) {

            var response = new Response(false, "Error al crear la cuarentena", errors);

            res.status(400);
            return res.json(response.json);
            return;
        }

        const data = {
            quarantineDate,
            affectedBirds,
            symptoms,
            diagnosis,
            treatmentApplied,
            dosage,
            treatmentDuration,
            observations,
            quarantineEndDate
        };

        const quarantine = await QuarantineCreate(data);

        var response = new Response(true, "Cuarentena creada exitosamente", quarantine);

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error en crear cuarentena:", error);

        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);

        res.status(500);
        res.json(errorResponse.json);
    }
};

const updateQuarantine = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            quarantineDate,
            affectedBirds,
            symptoms,
            diagnosis,
            treatmentApplied,
            dosage,
            treatmentDuration,
            observations,
            quarantineEndDate
        } = req.body;

        var errors = [];

        if (!id) {
            errors.push("El ID de la cuarentena es obligatorio");
        }

        if (!quarantineDate || quarantineDate.trim() === "") {
            errors.push("La fecha de la cuarentena es obligatoria");
        }

        if (!affectedBirds) {
            errors.push("Los pájaros afectados son obligatorios");
        }

        if (!symptoms || symptoms.trim() === "") {
            errors.push("Los síntomas son obligatorios");
        }

        if (!diagnosis || diagnosis.trim() === "") {
            errors.push("El diagnóstico es obligatorio");
        }

        if (!treatmentApplied || treatmentApplied.trim() === "") {
            errors.push("El tratamiento aplicado es obligatorio");
        }

        if (!dosage || dosage.trim() === "") {
            errors.push("La dosis es obligatoria");
        }

        if (!treatmentDuration || treatmentDuration.trim() === "") {
            errors.push("La duración del tratamiento es obligatoria");
        }
        if (observations && observations.trim() === "") {
            errors.push("Las observaciones no pueden estar vacías");
        }

        if (quarantineEndDate && quarantineEndDate.trim() === "") {
            errors.push("La fecha de finalización de la cuarentena no puede estar vacía");
        }

        if (errors.length > 0) {

            var response = new Response(false, "Error al actualizar la cuarentena", errors);

            res.status(400);
            return res.json(response.json);
            return;
        }

        const data = {
            quarantineDate,
            affectedBirds,
            symptoms,
            diagnosis,
            treatmentApplied,
            dosage,
            treatmentDuration,
            observations,
            quarantineEndDate
        };

        const quarantine = await QuarantineUpdate(id, data);

        var response = new Response(true, "Cuarentena actualizada exitosamente", quarantine);

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error en actualizar cuarentena:", error);

        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);

        res.status(500);
        res.json(errorResponse.json);
    }
};

const deleteQuarantine = async (req, res) => {

    try {

        const { id } = req.params;

        var errors = [];

        if (!id) {
            errors.push("El ID de la cuarentena es obligatorio");
        }

        if (errors.length > 0) {

            var response = new Response(false, "Error al eliminar la cuarentena", errors);

            res.status(400);
            return res.json(response.json);
            return;
        }
        data = { id };
        const quarantine = await QuarantineDelete(id);

        var response = new Response(true, "Cuarentena eliminada exitosamente", quarantine);

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error en eliminar cuarentena:", error);

        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);

        res.status(500);
        res.json(errorResponse.json);
    }
};

module.exports = {
    getQuarantines,
    getAllQuarantinesById,
    createQuarantine,
    updateQuarantine,
    deleteQuarantine
};