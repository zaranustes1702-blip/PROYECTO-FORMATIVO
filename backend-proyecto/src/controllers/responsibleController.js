const { createResponsibleService } = require('../services/responsibleServices');
const { Response } = require("../functions/response");

const getAllResponsibles = (req, res) => {
    const body = req.body;
    console.log("Body recibido:", body);

    res.status(201);
    res.json({ message: "Obteniendo todos los responsables" });
};

const getResponsibleById = (req, res) => {
    const { id } = req.params;
    res.json({ message: `Obteniendo responsable con id ${id}` });
};

const createResponsible = async (req, res) => {

    const {
        fullName,
        documentNumber,
        trainingRecord,
        role,
        responsibleType
    } = req.body;

    var errors = [];

    if (
        !fullName ||
        !documentNumber ||
        !trainingRecord ||
        !role ||
        !responsibleType
    ) {
        errors.push("Todos los campos son obligatorios");
    }

    if (fullName == "") errors.push("El campo fullName no puede estar vacío");
    if (documentNumber == "") errors.push("El campo documentNumber no puede estar vacío");
    if (trainingRecord == "") errors.push("El campo trainingRecord no puede estar vacío");
    if (role == "") errors.push("El campo role no puede estar vacío");
    if (responsibleType == "") errors.push("El campo responsibleType no puede estar vacío");

    if (errors.length > 0) {
        var response = new Response(
            false,
            "Error al crear responsable",
            null,
            errors
        );

        return res.status(400).json(response.json());
    }

    const data = {
        fullName,
        documentNumber,
        trainingRecord,
        role,
        responsibleType
    };

    const responsible = await createResponsibleService(data);

    var response = new Response(
        true,
        "Responsable creado exitosamente",
        responsible
    );

    res.status(201);
    res.json(response.json());
};

const updateResponsible = (req, res) => {
    const { id } = req.params;

    res.json({
        message: `Actualizando responsable con id ${id}`
    });
};

const deleteResponsible = (req, res) => {
    const { id } = req.params;

    res.json({
        message: `Eliminando responsable con id ${id}`
    });
};

module.exports = {
    getAllResponsibles,
    getResponsibleById,
    createResponsible,
    updateResponsible,
    deleteResponsible
};