
const {
    getAllEggProductions,
    getEggProductionById,
    EggProductionCreate,
    EggProductionUpdate,
    EggProductionDelete
} = require("../services/eggProductionServices");

const Response = require("../functions/response");

const getEggProductions = async (req, res) => {
    try {

        const eggProductions = await getAllEggProductions();

        var response = new Response(
            true,
            "Producciones obtenidas exitosamente",
            eggProductions
        );

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error obteniendo producciones:", error);

        const errorResponse = new Response(
            false,
            "Error interno del servidor",
            [{ message: error.message || "Ocurrió un error inesperado" }]
        );

        res.status(500);
        res.json(errorResponse.json);
    }
};

const getAllEggProductionsById = async (req, res) => {

    try {

        const { id } = req.params;

        var errors = [];

        if (!id) {
            errors.push("El ID del registro es obligatorio");
        }

        if (errors.length > 0) {

            var response = new Response(
                false,
                "Error al obtener el registro",
                errors
            );

            res.status(400);
            res.json(response.json);
            return;
        }

        const eggProduction = await getEggProductionById(id);

        if (!eggProduction) {

            var response = new Response(
                false,
                "El registro no existe",
                []
            );

            res.status(404);
            res.json(response.json);
            return;
        }

        var response = new Response(
            true,
            "Registro obtenido exitosamente",
            eggProduction
        );

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error obteniendo registro:", error);

        const errorResponse = new Response(
            false,
            "Error interno del servidor",
            [{ message: error.message || "Ocurrió un error inesperado" }]
        );

        res.status(500);
        res.json(errorResponse.json);
    }
};

const createEggProduction = async (req, res) => { 
 
    try { 
 
        const { 
            productionDate, 
            productionHour, 
            responsible, 
            collectedAM, 
            collectedPM, 
            jumboEggs, 
            aaaEggs, 
            aaEggs, 
            aEggs, 
            bEggs, 
            cEggs, 
            brokenEggs, 
            totalDay, 
            goodEggs, 
            weeklyEggTotal, 
            productionPercentage, 
            observations 
        } = req.body; 
 
        var errors = []; 
 
        if (!productionDate) errors.push("La fecha es obligatoria"); 
        if (!productionHour) errors.push("La hora es obligatoria"); 
        if (!responsible || responsible.trim() === "") errors.push("El responsable es obligatorio"); 
 
        if (errors.length > 0) { 
 
            var response = new Response( 
                false, 
                "Error al crear el registro", 
                errors 
            ); 
 
            res.status(400); 
            return res.json(response.json); 
        } 
 
        const data = { 
            productionDate, 
            productionHour, 
            responsible, 
            collectedAM, 
            collectedPM, 
            jumboEggs, 
            aaaEggs, 
            aaEggs, 
            aEggs, 
            bEggs, 
            cEggs, 
            brokenEggs, 
            totalDay, 
            goodEggs, 
            weeklyEggTotal, 
            productionPercentage, 
            observations 
        }; 
 
        const eggProduction = await EggProductionCreate(data); 
 
        var response = new Response( 
            true, 
            "Producción registrada exitosamente", 
            eggProduction 
        ); 
 
        res.status(201); 
        res.json(response.json); 
 
    } catch (error) { 
 
        console.error("Error creando producción:", error); 
 
        const errorResponse = new Response( 
            false, 
            "Error interno del servidor", 
            [{ message: error.message || "Ocurrió un error inesperado" }] 
        ); 
 
        res.status(500); 
        res.json(errorResponse.json); 
    } 
}; 
 
const updateEggProduction = async (req, res) => { 
 
    try { 
 
        const { id } = req.params; 
 
        const { 
            productionDate, 
            productionHour, 
            responsible, 
            collectedAM, 
            collectedPM, 
            jumboEggs, 
            aaaEggs, 
            aaEggs, 
            aEggs, 
            bEggs, 
            cEggs, 
            brokenEggs, 
            totalDay, 
            goodEggs, 
            weeklyEggTotal, 
            productionPercentage, 
            observations 
        } = req.body; 
 
        var errors = []; 
 
        if (!id) errors.push("El ID es obligatorio"); 
        if (!productionDate) errors.push("La fecha es obligatoria"); 
        if (!productionHour) errors.push("La hora es obligatoria"); 
        if (!responsible || responsible.trim() === "") errors.push("El responsable es obligatorio"); 
 
        if (errors.length > 0) { 
 
            var response = new Response( 
                false, 
                "Error al actualizar el registro", 
                errors 
            ); 
 
            res.status(400); 
            return res.json(response.json); 
        } 
 
        const data = { 
            productionDate, 
            productionHour, 
            responsible, 
            collectedAM, 
            collectedPM, 
            jumboEggs, 
            aaaEggs, 
            aaEggs, 
            aEggs, 
            bEggs, 
            cEggs, 
            brokenEggs, 
            totalDay, 
            goodEggs, 
            weeklyEggTotal, 
            productionPercentage, 
            observations 
        }; 
 
        const eggProduction = await EggProductionUpdate(id, data); 
 
        var response = new Response( 
            true, 
            "Producción actualizada exitosamente", 
            eggProduction 
        ); 
 
        res.status(201); 
        res.json(response.json); 
 
    } catch (error) { 
 
        console.error("Error actualizando producción:", error); 
 
        const errorResponse = new Response( 
            false, 
            "Error interno del servidor", 
            [{ message: error.message || "Ocurrió un error inesperado" }] 
        ); 
 
        res.status(500); 
        res.json(errorResponse.json); 
    } 
};
const deleteEggProduction = async (req, res) => {

    try {

        const { id } = req.params;

        var errors = [];

        if (!id) {
            errors.push("El ID es obligatorio");
        }

        if (errors.length > 0) {

            var response = new Response(
                false,
                "Error al eliminar el registro",
                errors
            );

            res.status(400);
            return res.json(response.json);
        }

        const eggProduction = await EggProductionDelete(id);

        var response = new Response(
            true,
            "Registro eliminado exitosamente",
            eggProduction
        );

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error eliminando producción:", error);

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
    getEggProductions,
    getAllEggProductionsById,
    createEggProduction,
    updateEggProduction,
    deleteEggProduction
};