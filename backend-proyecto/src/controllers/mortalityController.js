const {
    getAllMortalities,
    getMortalityById,
    MortalityCreate,
    MortalityUpdate,
    MortalityDelete
} = require("../services/mortalityServices");

const Response = require("../functions/response");

const getMortalities = async (req, res) => {
  try {
    const querylimit = req.query.limit
    const queryoffset = req.query.offset
    const limit = querylimit ? parseInt(querylimit) : 10;
    const offset = queryoffset ? parseInt(queryoffset) : 0;

    const mortalities = await getMortalities(limit, offset);

    const response = new Response(
      true,
      "Registros de mortalidad obtenidos exitosamente",
      mortalities,
    );

    res.status(200);
    res.json(response.json);
  } catch (error) {
        console.error("Error obteniendo registros de mortalidad:", error);
        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);
        res.status(500);
        res.json(errorResponse.json);
    }
};

const getAllMortalitiesById = async (req, res) => {
    try {

        const { id } = req.params;
        var errors = [];

        if (!id) {
            errors.push("El ID del registro de mortalidad es obligatorio");
        }

        if (errors.length > 0) {
            var response = new Response(false, "Error al obtener el registro de mortalidad", errors);
            res.status(400);
            res.json(response.json);
            return;
        }
        const mortality = await getMortalityById(id);
                // Validación de existencia del ID
        if (!mortality) {
            var response = new Response(
                false,
                "El registro de mortalidad no existe",
                []
            );

            res.status(404);
            res.json(response.json);
            return;
        }


        var response = new Response(true, "Registro de mortalidad obtenido exitosamente", mortality);

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error obteniendo registro de mortalidad:", error);

        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);

        res.status(500);
        res.json(errorResponse.json);
    }
};

const createMortality = async (req, res) => {

    try {

        const {
        mortalityDate,
        mortalityTime,
        dailyMortality,
        possibleCauseOfDeath,
        necropsyPerformed,
        observations
        } = req.body;

        var errors = [];

        if (!mortalityDate || mortalityDate.trim() === "") {
            errors.push("La fecha de mortalidad es obligatoria");
        }

        if (!mortalityTime || mortalityTime.trim() === "") {
            errors.push("La hora de mortalidad es obligatoria");
        }

        if (dailyMortality === undefined || dailyMortality === null) {
            errors.push("La mortalidad diaria es obligatoria");
        }

        if (!possibleCauseOfDeath || possibleCauseOfDeath.trim() === "") {
            errors.push("La posible causa de muerte es obligatoria");
        }

        if (necropsyPerformed === undefined || necropsyPerformed === null) {
            errors.push("El campo necropsia realizada es obligatorio");
        }

        if (errors.length > 0) {

            var response = new Response(false, "Error al crear el registro de mortalidad", errors);

            res.status(400);
            return res.json(response.json);
        }

        const data = {
            mortalityDate,
            mortalityTime,
            dailyMortality,
            possibleCauseOfDeath,
            necropsyPerformed,
            observations
        };

        const mortality = await MortalityCreate(data);

        var response = new Response(true, "Registro de mortalidad creado exitosamente", mortality);

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error en crear registro de mortalidad:", error);

        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);

        res.status(500);
        res.json(errorResponse.json);
    }
};

const updateMortality = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            mortalityDate,
            mortalityTime,
            dailyMortality,
            possibleCauseOfDeath,
            necropsyPerformed,
            observations
        } = req.body;

        var errors = [];

        if (!id) {
            errors.push("El ID del registro de mortalidad es obligatorio");
        }

        if (!mortalityDate || mortalityDate.trim() === "") {
            errors.push("La fecha de mortalidad es obligatoria");
        }

        if (!mortalityTime || mortalityTime.trim() === "") {
            errors.push("La hora de mortalidad es obligatoria");
        }

        if (dailyMortality === undefined || dailyMortality === null) {
            errors.push("La mortalidad diaria es obligatoria");
        }

        if (!possibleCauseOfDeath || possibleCauseOfDeath.trim() === "") {
            errors.push("La posible causa de muerte es obligatoria");
        }

        if (necropsyPerformed === undefined || necropsyPerformed === null) {
            errors.push("El campo necropsia realizada es obligatorio");
        }

        if (errors.length > 0) {

            var response = new Response(false, "Error al actualizar el registro de mortalidad", errors);

            res.status(400);
            return res.json(response.json);
        }

        const data = {
            mortalityDate,
            mortalityTime,
            dailyMortality,
            possibleCauseOfDeath,
            necropsyPerformed,
            observations
        };

        const mortality = await MortalityUpdate(id, data);

        var response = new Response(true, "Registro de mortalidad actualizado exitosamente", mortality);

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error en actualizar registro de mortalidad:", error);

        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);

        res.status(500);
        res.json(errorResponse.json);
    }
};

const deleteMortality = async (req, res) => {

    try {

        const { id } = req.params;

        var errors = [];

        if (!id) {
            errors.push("El ID del registro de mortalidad es obligatorio");
        }

        if (errors.length > 0) {

            var response = new Response(false, "Error al eliminar el registro de mortalidad", errors);

            res.status(400);
            return res.json(response.json);
        }

        const mortality = await MortalityDelete(id);

        var response = new Response(true, "Registro de mortalidad eliminado exitosamente", mortality);

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error en eliminar registro de mortalidad:", error);

        const errorResponse = new Response(false, "Error interno del servidor", [
            { message: error.message || "Ocurrió un error inesperado" }
        ]);

        res.status(500);
        res.json(errorResponse.json);
    }
};

module.exports = {
    getMortalities,
    getAllMortalitiesById,
    createMortality,
    updateMortality,
    deleteMortality
};
