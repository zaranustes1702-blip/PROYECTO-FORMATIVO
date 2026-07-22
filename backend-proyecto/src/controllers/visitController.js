const {
    getAllVisits,
    getVisitById,
    visitCreate,
    visitUpdate,
    visitDelete
} = require("../services/visitServices");

const Response = require("../functions/response");

const getVisits = async (req, res) => {
    try{
        const visits = await getAllVisits();
        
        var response = new Response(
            true, 
            "Visitas obtenidas exitosamente", 
            visits
        ); 
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error obteniendo visitas:", error);
        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

const getAllVisitsById = async (req, res) => {
    try {

        const { id } = req.params;
        var errors = [];

        if (!id) {
            errors.push("El ID de la visita es obligatorio");
        }

        if (errors.length > 0) {
            var response = new Response(false, "Error al obtener la visita", errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        
        const visit = await getVisitById(id);
        // Validación de existencia del ID
        if (!visit) {
            var response = new Response(
                false,
                "La visita no existe",
                []
            );

            res.status(404);
            res.json(response.json);
            return;
        }


        var response = new Response(true, "Visita obtenida exitosamente", visit);

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error obteniendo visita:", error);

        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);

        res.status(500);
        res.json(errorResponse.json);
    }
};

const createVisit = async (req, res) => {

    try {

        const {
            visitDate,
            visitorName,
            institutionOrganization,
            visitReason,
            observations,
            responsiblePerson,
        } = req.body;

        var errors = [];

        if (!visitDate || visitDate.trim() === "") {
            errors.push("La fecha de la visita es obligatoria");
        }

        if (!visitorName || visitorName.trim() === "") {
            errors.push("El nombre del visitante es obligatorio");
        }

        if (!institutionOrganization || institutionOrganization.trim() === "") {
            errors.push("La institución o organización es obligatoria");
        }

        if (!visitReason || visitReason.trim() === "") {
            errors.push("La razón de la visita es obligatoria");
        }

        if (!observations || observations.trim() === "") {
            errors.push("Las observaciones son obligatorias");
        }

        if (!responsiblePerson || responsiblePerson.trim() === "") {
            errors.push("La persona responsable es obligatoria");
        }

        if (errors.length > 0) {

            var response = new Response(false, "Error al crear la visita", errors);

            res.status(400);
            return res.json(response.json);
            return;
        }

        const data = {
            visitDate,
            visitorName,
            institutionOrganization,
            visitReason,
            observations,
            responsiblePerson
        };

        const visit = await visitCreate(data);

        var response = new Response(true, "Visita creada exitosamente", visit);

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error en crear visita:", error);

        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);

        res.status(500);
        res.json(errorResponse.json);
    }
};

const updateVisit = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            visitDate,
            visitorName,
            institutionOrganization,
            visitReason,
            observations,
            responsiblePerson,
        } = req.body;

        var errors = [];

        if (!id) {
            errors.push("El ID de la visita es obligatorio");
        }

        if (!visitDate || visitDate.trim() === "") {
            errors.push("La fecha de la visita es obligatoria");
        }

        if (!visitorName || visitorName.trim() === "") {
            errors.push("El nombre del visitante es obligatorio");
        }

        if (!institutionOrganization || institutionOrganization.trim() === "") {
            errors.push("La institución o organización es obligatoria");
        }

        if (!visitReason || visitReason.trim() === "") {
            errors.push("La razón de la visita es obligatoria");
        }

        if (!observations || observations.trim() === "") {
            errors.push("Las observaciones son obligatorias");
        }

        if (!responsiblePerson || responsiblePerson.trim() === "") {
            errors.push("La persona responsable es obligatoria");
        }

        if (errors.length > 0) {

            var response = new Response(false, "Error al actualizar la visita", errors);

            res.status(400);
            return res.json(response.json);
            return;
        }

        const data = {
            visitDate,
            visitorName,
            institutionOrganization,
            visitReason,
            observations,
            responsiblePerson
        };

        const visit = await visitUpdate(id, data);

        var response = new Response(true, "Visita actualizada exitosamente", visit);

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error en actualizar visita:", error);

        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);

        res.status(500);
        res.json(errorResponse.json);
    }
};

const deleteVisit = async (req, res) => {

    try {

        const { id } = req.params;

        var errors = [];

        if (!id) {
            errors.push("El ID de la visita es obligatorio");
        }

        if (errors.length > 0) {

            var response = new Response(false, "Error al eliminar la visita ", errors);

            res.status(400);
            return res.json(response.json);
            return;
        }
        data = { id };
        const visit = await visitDelete(id);

        var response = new Response(true, "Visita eliminada exitosamente", visit);

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error en deleteVisit:", error);

        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);

        res.status(500);
        res.json(errorResponse.json);
    }
};

module.exports = {
    getVisits,
    getAllVisitsById,
    createVisit,
    updateVisit,
    deleteVisit
};