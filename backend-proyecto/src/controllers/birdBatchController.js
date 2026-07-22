const { createBirdBatchService } = require("../services/birdBatchServices");
const { Response } = require("../functions/response");

const getAllBirdBatches = (req, res) => {
    const body = req.body;
    console.log("Body recibido:", body);

    res.status(201);
    res.json({ message: "Obteniendo todos los lotes de aves" });
};

const getBirdBatchById = (req, res) => {
    const { id } = req.params;
    res.json({ message: `Obteniendo lote de aves con id ${id}` });
};

const createBirdBatch = async (req, res) => {

    const {
        entryDate,
        batchNumber,
        birdQuantity,
        batchWeight,
        birdAgeWeeks,
        appliedVaccines
    } = req.body;

    var errors = [];

    if (
        !entryDate ||
        !batchNumber ||
        !birdQuantity ||
        !batchWeight ||
        !birdAgeWeeks ||
        !appliedVaccines
    ) {
        errors.push("Todos los campos son obligatorios");
    }

    if (batchNumber == "") errors.push("El campo batchNumber no puede estar vacío");
    if (appliedVaccines == "") errors.push("El campo appliedVaccines no puede estar vacío");

    if (errors.length > 0) {
        var response = new Response(
            false,
            "Error al crear lote de aves",
            null,
            errors
        );

        return res.status(400).json(response.json());
    }

    const data = {
        entryDate,
        batchNumber,
        birdQuantity,
        batchWeight,
        birdAgeWeeks,
        appliedVaccines
    };

    const birdBatch = await createBirdBatchService(data);

    var response = new Response(
        true,
        "Lote de aves creado exitosamente",
        birdBatch
    );

    res.status(201);
    res.json(response.json());
};

const updateBirdBatch = (req, res) => {
    const { id } = req.params;
    res.json({ message: `Actualizando lote de aves con id ${id}` });
};

const deleteBirdBatch = (req, res) => {
    const { id } = req.params;
    res.json({ message: `Eliminando lote de aves con id ${id}` });
};

module.exports = {
    getAllBirdBatches,
    getBirdBatchById,
    createBirdBatch,
    updateBirdBatch,
    deleteBirdBatch
};