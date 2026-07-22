const { createMortalityService } = require('../services/mortalityServices');
const { Response } = require("../functions/response");

const getAllMortalities = (req, res) => {
    const body = req.body;
    console.log("Body recibido:", body);

    res.status(201);
    res.json({ message: "Obteniendo todos los registros de mortalidad" });
};

const getMortalityById = (req, res) => {
    const { id } = req.params;
    res.json({ message: `Obteniendo mortalidad con id ${id}` });
};

const createMortality = async (req, res) => {

    const {
        mortalityDate,
        mortalityTime,
        dailyMortality,
        possibleCauseOfDeath,
        necropsyPerformed,
        observations
    } = req.body;

    var errors = [];

    if (
        !mortalityDate ||
        !mortalityTime ||
        !dailyMortality ||
        !possibleCauseOfDeath ||
        necropsyPerformed === undefined
    ) {
        errors.push("Todos los campos son obligatorios");
    }

    if (mortalityTime == "") errors.push("El campo mortalityTime no puede estar vacío");
    if (possibleCauseOfDeath == "") errors.push("El campo possibleCauseOfDeath no puede estar vacío");

    if (errors.length > 0) {
        var response = new Response(
            false,
            "Error al crear mortalidad",
            null,
            errors
        );

        return res.status(400).json(response.json());
    }

    const data = {
        mortalityDate,
        mortalityTime,
        dailyMortality,
        possibleCauseOfDeath,
        necropsyPerformed,
        observations
    };

    const mortality = await createMortalityService(data);

    var response = new Response(
        true,
        "Registro de mortalidad creado exitosamente",
        mortality
    );

    res.status(201);
    res.json(response.json());
};

const updateMortality = (req, res) => {
    const { id } = req.params;

    res.json({
        message: `Actualizando mortalidad con id ${id}`
    });
};

const deleteMortality = (req, res) => {
    const { id } = req.params;

    res.json({
        message: `Eliminando mortalidad con id ${id}`
    });
};

module.exports = {
    getAllMortalities,
    getMortalityById,
    createMortality,
    updateMortality,
    deleteMortality
};