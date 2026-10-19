
const {
    getAllVisits,
    getVisitById,
    visitCreate,
    visitUpdate,
    visitDelete
} = require("../services/visitServices");

const Response = require("../functions/response");

// Convierte el estado recibido a booleano
const convertirActivo = (valor) => valor === true || valor === "true";

// Obtener todas las visitas
const getVisits = async (req, res) => {

    try {

        const querylimit = req.query.limit;
        const queryoffset = req.query.offset;

        const limit = querylimit ? parseInt(querylimit) : 10;
        const offset = queryoffset ? parseInt(queryoffset) : 0;

        const visits = await getAllVisits(limit, offset);

        var response = new Response(
            true,
            "Visitas obtenidas exitosamente",
            visits
        );

        res.status(200);
        res.json(response.json);

    } catch (error) {

        console.error("Error obteniendo visitas:", error);

        const errorResponse = new Response(
            false,
            "Error interno del servidor",
            [{ message: error.message || "Ocurrió un error inesperado" }]
        );

        res.status(500);
        res.json(errorResponse.json);
    }
};

// Obtener visita por ID
const getAllVisitsById = async (req, res) => {

    try {

        const { id } = req.params;

        var errors = [];

        if (!id) {
            errors.push("El ID de la visita es obligatorio");
        }

        if (errors.length > 0) {

            var response = new Response(
                false,
                "Error al obtener la visita",
                errors
            );

            res.status(400);
            return res.json(response.json);
        }

        const visit = await getVisitById(id);

        if (!visit) {

            var response = new Response(
                false,
                "La visita no existe",
                []
            );

            res.status(404);
            return res.json(response.json);
        }

        var response = new Response(
            true,
            "Visita obtenida exitosamente",
            visit
        );

        res.status(200);
        res.json(response.json);

    } catch (error) {

        console.error("Error obteniendo visita:", error);

        const errorResponse = new Response(
            false,
            "Error interno del servidor",
            [{ message: error.message || "Ocurrió un error inesperado" }]
        );

        res.status(500);
        res.json(errorResponse.json);
    }
};

// Crear visita
const createVisit = async (req, res) => {

    try {

        const {
            visitDate,
            visitorName,
            institutionOrganization,
            visitReason,
            observations,
            responsiblePerson,
            active
        } = req.body || {};

        console.log("Datos recibidos:", req.body);

        var errors = [];

        if (!visitDate || typeof visitDate !== "string" ||
            visitDate.trim() === "" ||
            isNaN(new Date(visitDate).getTime())) {
            errors.push("La fecha de la visita es obligatoria o no es válida");
        }

        if (!visitorName || typeof visitorName !== "string" ||
            visitorName.trim() === "") {
            errors.push("El nombre del visitante es obligatorio");
        } else if (visitorName.trim().length < 3 ||
                   visitorName.trim().length > 50) {
            errors.push("El nombre debe tener entre 3 y 50 caracteres");
        }

        if (!institutionOrganization ||
            typeof institutionOrganization !== "string" ||
            institutionOrganization.trim() === "") {
            errors.push("La institución o organización es obligatoria");
        }

        if (!visitReason || typeof visitReason !== "string" ||
            visitReason.trim() === "") {
            errors.push("La razón de la visita es obligatoria");
        }

        // Las observaciones son opcionales
        if (observations != null &&
            typeof observations !== "string") {
            errors.push("Las observaciones deben ser texto");
        }

        if (!responsiblePerson ||
            typeof responsiblePerson !== "string" ||
            responsiblePerson.trim() === "") {
            errors.push("La persona responsable es obligatoria");
        }

        if (errors.length > 0) {

            console.log("Errores de validación:", errors);

            var response = new Response(
                false,
                "Error al crear la visita",
                errors
            );

            res.status(400);
            return res.json(response.json);
        }

        const data = {
            visitDate,
            visitorName: visitorName.trim(),
            institutionOrganization: institutionOrganization.trim(),
            visitReason: visitReason.trim(),
            observations: observations && observations.trim() !== ""
                ? observations.trim()
                : "Sin observaciones",
            responsiblePerson: responsiblePerson.trim(),
            active: active === undefined ? true : convertirActivo(active)
        };

        const visit = await visitCreate(data);

        var response = new Response(
            true,
            "Visita creada exitosamente",
            visit
        );

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error en crear visita:", error);

        const errorResponse = new Response(
            false,
            "Error interno del servidor",
            [{ message: error.message || "Ocurrió un error inesperado" }]
        );

        res.status(500);
        res.json(errorResponse.json);
    }
};

// Actualizar visita
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
            active
        } = req.body || {};

        var errors = [];

        if (!id) {
            errors.push("El ID de la visita es obligatorio");
        }

        if (!visitDate || typeof visitDate !== "string" ||
            visitDate.trim() === "" ||
            isNaN(new Date(visitDate).getTime())) {
            errors.push("La fecha de la visita es obligatoria o no es válida");
        }

        if (!visitorName || typeof visitorName !== "string" ||
            visitorName.trim() === "") {
            errors.push("El nombre del visitante es obligatorio");
        } else if (visitorName.trim().length < 3 ||
                   visitorName.trim().length > 50) {
            errors.push("El nombre debe tener entre 3 y 50 caracteres");
        }

        if (!institutionOrganization ||
            typeof institutionOrganization !== "string" ||
            institutionOrganization.trim() === "") {
            errors.push("La institución o organización es obligatoria");
        }

        if (!visitReason || typeof visitReason !== "string" ||
            visitReason.trim() === "") {
            errors.push("La razón de la visita es obligatoria");
        }

        // Las observaciones son opcionales
        if (observations != null &&
            typeof observations !== "string") {
            errors.push("Las observaciones deben ser texto");
        }

        if (!responsiblePerson ||
            typeof responsiblePerson !== "string" ||
            responsiblePerson.trim() === "") {
            errors.push("La persona responsable es obligatoria");
        }

        if (errors.length > 0) {

            var response = new Response(
                false,
                "Error al actualizar la visita",
                errors
            );

            res.status(400);
            return res.json(response.json);
        }

        const visitExist = await getVisitById(id);

        if (!visitExist) {

            var response = new Response(
                false,
                "La visita no existe",
                []
            );

            res.status(404);
            return res.json(response.json);
        }

        const data = {
            visitDate,
            visitorName: visitorName.trim(),
            institutionOrganization: institutionOrganization.trim(),
            visitReason: visitReason.trim(),
            observations: observations && observations.trim() !== ""
                ? observations.trim()
                : "Sin observaciones",
            responsiblePerson: responsiblePerson.trim()
        };

        if (active !== undefined) {
            data.active = convertirActivo(active);
        }

        const visit = await visitUpdate(id, data);

        var response = new Response(
            true,
            "Visita actualizada exitosamente",
            visit
        );

        res.status(200);
        res.json(response.json);

    } catch (error) {

        console.error("Error en actualizar visita:", error);

        const errorResponse = new Response(
            false,
            "Error interno del servidor",
            [{ message: error.message || "Ocurrió un error inesperado" }]
        );

        res.status(500);
        res.json(errorResponse.json);
    }
};

// Eliminar visita
const deleteVisit = async (req, res) => {

    try {

        const { id } = req.params;

        var errors = [];

        if (!id) {
            errors.push("El ID de la visita es obligatorio");
        }

        if (errors.length > 0) {

            var response = new Response(
                false,
                "Error al eliminar la visita",
                errors
            );

            res.status(400);
            return res.json(response.json);
        }

        const visitExist = await getVisitById(id);

        if (!visitExist) {

            var response = new Response(
                false,
                "La visita no existe",
                []
            );

            res.status(404);
            return res.json(response.json);
        }

        const visit = await visitDelete(id);

        var response = new Response(
            true,
            "Visita eliminada exitosamente",
            visit
        );

        res.status(200);
        res.json(response.json);

    } catch (error) {

        console.error("Error en deleteVisit:", error);

        const errorResponse = new Response(
            false,
            "Error interno del servidor",
            [{ message: error.message || "Ocurrió un error inesperado" }]
        );

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