const { createSupplyService } = require('../services/supplyServices');
const { Response } = require("../functions/response");

const getAllSupplies = (req, res) => {
    const body = req.body;
    console.log("Body recibido:", body);

    res.status(201);
    res.json({ message: "Obteniendo todos los insumos" });
};

const getSupplyById = (req, res) => {
    const { id } = req.params;
    res.json({ message: `Obteniendo insumo con id ${id}` });
};

const createSupply = async (req, res) => {

    const {
        supplyDate,
        supplyType,
        supplyName,
        category,
        brand,
        unitMeasure,
        stockQuantity,
        unitValue,
        totalValue,
        reference,
        expirationDate,
        supplier,
        storageLocation,
        responsiblePerson,
        observations
    } = req.body;

    var errors = [];

    if (
        !supplyDate ||
        !supplyType ||
        !supplyName ||
        !category ||
        !unitMeasure ||
        !stockQuantity ||
        !unitValue ||
        !totalValue ||
        !reference ||
        !supplier ||
        !storageLocation ||
        !responsiblePerson
    ) {
        errors.push("Todos los campos obligatorios deben ser completados");
    }

    if (supplyType == "") errors.push("El campo supplyType no puede estar vacío");
    if (supplyName == "") errors.push("El campo supplyName no puede estar vacío");
    if (category == "") errors.push("El campo category no puede estar vacío");
    if (reference == "") errors.push("El campo reference no puede estar vacío");

    if (errors.length > 0) {
        var response = new Response(
            false,
            "Error al crear insumo",
            null,
            errors
        );

        return res.status(400).json(response.json());
    }

    const data = {
        supplyDate,
        supplyType,
        supplyName,
        category,
        brand,
        unitMeasure,
        stockQuantity,
        unitValue,
        totalValue,
        reference,
        expirationDate,
        supplier,
        storageLocation,
        responsiblePerson,
        observations
    };

    const supply = await createSupplyService(data);

    var response = new Response(
        true,
        "Insumo creado exitosamente",
        supply
    );

    res.status(201);
    res.json(response.json());
};

const updateSupply = (req, res) => {
    const { id } = req.params;

    res.json({
        message: `Actualizando insumo con id ${id}`
    });
};

const deleteSupply = (req, res) => {
    const { id } = req.params;

    res.json({
        message: `Eliminando insumo con id ${id}`
    });
};

module.exports = {
    getAllSupplies,
    getSupplyById,
    createSupply,
    updateSupply,
    deleteSupply
};