const { createEggProductionService } = require('../services/eggProductionServices');
const { Response } = require("../functions/response");

const getAllEggProductions = (req, res) => {
    const body = req.body;
    console.log("Body recibido:", body);

    res.status(201);
    res.json({ message: "Obteniendo toda la producción de huevos" });
};

const getEggProductionById = (req, res) => {
    const { id } = req.params;
    res.json({ message: `Obteniendo producción de huevos con id ${id}` });
};

const createEggProduction = async (req, res) => {

    const {
        productionDate,
        birdQuantity,
        collectedAM,
        collectedPM,
        dailyProduction,
        brokenEggs,
        eggType,
        unitValue,
        totalValue,
        weeklyEggTotal
    } = req.body;

    var errors = [];

    if (
        !productionDate ||
        !birdQuantity ||
        !collectedAM ||
        !collectedPM ||
        !dailyProduction ||
        !brokenEggs ||
        !eggType ||
        !unitValue ||
        !totalValue ||
        !weeklyEggTotal
    ) {
        errors.push("Todos los campos son obligatorios");
    }

    if (eggType == "") errors.push("El campo eggType no puede estar vacío");

    if (errors.length > 0) {
        var response = new Response(
            false,
            "Error al crear producción de huevos",
            null,
            errors
        );

        return res.status(400).json(response.json());
    }

    const data = {
        productionDate,
        birdQuantity,
        collectedAM,
        collectedPM,
        dailyProduction,
        brokenEggs,
        eggType,
        unitValue,
        totalValue,
        weeklyEggTotal
    };

    const eggProduction = await createEggProductionService(data);

    var response = new Response(
        true,
        "Producción de huevos creada exitosamente",
        eggProduction
    );

    res.status(201);
    res.json(response.json());
};

const updateEggProduction = (req, res) => {
    const { id } = req.params;
    res.json({ message: `Actualizando producción de huevos con id ${id}` });
};

const deleteEggProduction = (req, res) => {
    const { id } = req.params;
    res.json({ message: `Eliminando producción de huevos con id ${id}` });
};

module.exports = {
    getAllEggProductions,
    getEggProductionById,
    createEggProduction,
    updateEggProduction,
    deleteEggProduction
};