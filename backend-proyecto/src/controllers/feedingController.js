const { createFeedingService } = require('../services/feedingServices');
const { Response } = require("../functions/response");

const getAllFeedings = (req, res) => {
    const body = req.body;
    console.log("Body recibido:", body);

    res.status(201);
    res.json({ message: "Obteniendo todas las alimentaciones" });
};

const getFeedingById = (req, res) => {
    const { id } = req.params;
    res.json({ message: `Obteniendo alimentación con id ${id}` });
};

const createFeeding = async (req, res) => {

    const {
        feedingDate,
        dailyConsumptionKg,
        remainingKg,
        remainingBags,
        responsiblePerson,
        shift
    } = req.body;

    var errors = [];

    if (
        !feedingDate ||
        !dailyConsumptionKg ||
        !remainingKg ||
        !remainingBags ||
        !responsiblePerson ||
        !shift
    ) {
        errors.push("Todos los campos son obligatorios");
    }

    if (responsiblePerson == "") errors.push("El campo responsiblePerson no puede estar vacío");
    if (shift == "") errors.push("El campo shift no puede estar vacío");

    if (errors.length > 0) {
        var response = new Response(
            false,
            "Error al crear alimentación",
            null,
            errors
        );

        return res.status(400).json(response.json());
    }

    const data = {
        feedingDate,
        dailyConsumptionKg,
        remainingKg,
        remainingBags,
        responsiblePerson,
        shift
    };

    const feeding = await createFeedingService(data);

    var response = new Response(
        true,
        "Alimentación creada exitosamente",
        feeding
    );

    res.status(201);
    res.json(response.json());
};

const updateFeeding = (req, res) => {
    const { id } = req.params;
    res.json({ message: `Actualizando alimentación con id ${id}` });
};

const deleteFeeding = (req, res) => {
    const { id } = req.params;
    res.json({ message: `Eliminando alimentación con id ${id}` });
};

module.exports = {
    getAllFeedings,
    getFeedingById,
    createFeeding,
    updateFeeding,
    deleteFeeding
};