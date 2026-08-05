const {
    getAllResponsibles,
    getResponsibleById,
    ResponsibleCreate,
    ResponsibleUpdate,
    ResponsibleDelete
} = require("../services/responsibleServices");

const Response = require("../functions/response");

const getResponsibles = async (req, res) => {
    try{
        const responsibles = await getAllResponsibles();

        var response = new Response(
            true,
            "Responsables obtenidos exitosamente",
            responsibles
        );
        res.status(201);
        res.json(response.json);
    } catch (error) {
        console.error("Error obteniendo responsables:", error);
        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

const getAllResponsiblesById = async (req, res) => {
    try {

        const { id } = req.params;
        var errors = [];

        if (!id) {
            errors.push("El ID del responsable es obligatorio");
        }

        if (errors.length > 0) {
            var response = new Response(false, "Error al obtener el responsable", errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        const responsible = await getResponsibleById(id);
                // Validación de existencia del ID
        if (!responsible) {
            var response = new Response(
                false,
                "El responsable no existe",
                []
            );

            res.status(404);
            res.json(response.json);
            return;
        }


        var response = new Response(true, "Responsable obtenido exitosamente", responsible);

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error obteniendo responsable:", error);

        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);

        res.status(500);
        res.json(errorResponse.json);
    }
};

const createResponsible = async (req, res) => {

    try {

        const {
        fullName,
        documentNumber,
        trainingRecord,
        role,
        responsibleType
        } = req.body;

        var errors = [];

        if (!fullName || fullName.trim() === "") {
            errors.push("El nombre completo del responsable es obligatorio");
        }

        if (!documentNumber || documentNumber.trim() === "") {
            errors.push("El número de documento es obligatorio");
        }

        if (!trainingRecord || trainingRecord.trim() === "") {
            errors.push("El registro de capacitación es obligatorio");
        }

        if (!role || role.trim() === "") {
            errors.push("El rol del responsable es obligatorio");
        }

        if (!responsibleType || responsibleType.trim() === "") {
            errors.push("El tipo de responsable es obligatorio");
        }

        if (errors.length > 0) {

            var response = new Response(false, "Error al crear el responsable", errors);

            res.status(400);
            return res.json(response.json);
        }

        const data = {
            fullName,
            documentNumber,
            trainingRecord,
            role,
            responsibleType
        };

        const responsible = await ResponsibleCreate(data);

        var response = new Response(true, "Responsable creado exitosamente", responsible);

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error en crear responsable:", error);

        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);

        res.status(500);
        res.json(errorResponse.json);
    }
};

const updateResponsible = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            fullName,
            documentNumber,
            trainingRecord,
            role,
            responsibleType
        } = req.body;

        var errors = [];

        if (!id) {
            errors.push("El ID del responsable es obligatorio");
        }

        if (!fullName || fullName.trim() === "") {
            errors.push("El nombre completo del responsable es obligatorio");
        }

        if (!documentNumber || documentNumber.trim() === "") {
            errors.push("El número de documento es obligatorio");
        }

        if (!trainingRecord || trainingRecord.trim() === "") {
            errors.push("El registro de capacitación es obligatorio");
        }

        if (!role || role.trim() === "") {
            errors.push("El rol del responsable es obligatorio");
        }

        if (!responsibleType || responsibleType.trim() === "") {
            errors.push("El tipo de responsable es obligatorio");
        }

        if (errors.length > 0) {

            var response = new Response(false, "Error al actualizar el responsable", errors);

            res.status(400);
            return res.json(response.json);
        }

        const data = {
            fullName,
            documentNumber,
            trainingRecord,
            role,
            responsibleType
        };

        const responsible = await ResponsibleUpdate(id, data);

        var response = new Response(true, "Responsable actualizado exitosamente", responsible);

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error en actualizar responsable:", error);

        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);

        res.status(500);
        res.json(errorResponse.json);
    }
};

const deleteResponsible = async (req, res) => {

    try {

        const { id } = req.params;

        var errors = [];

        if (!id) {
            errors.push("El ID del responsable es obligatorio");
        }

        if (errors.length > 0) {

            var response = new Response(false, "Error al eliminar el responsable", errors);

            res.status(400);
            return res.json(response.json);
        }

        const responsible = await ResponsibleDelete(id);

        var response = new Response(true, "Responsable eliminado exitosamente", responsible);

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error en eliminar responsable:", error);

        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);

        res.status(500);
        res.json(errorResponse.json);
    }
};

module.exports = {
    getResponsibles,
    getAllResponsiblesById,
    createResponsible,
    updateResponsible,
    deleteResponsible
};
