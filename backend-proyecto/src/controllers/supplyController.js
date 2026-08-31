const {
    getAllSupplies,
    getSupplyById,
    supplyCreate,
    supplyUpdate,
    supplyDelete
} = require("../services/supplyServices");

const Response = require("../functions/response");

const getSupplies = async (req, res) => {
  try {
    const querylimit = req.query.limit
    const queryoffset = req.query.offset
    const limit = querylimit ? parseInt(querylimit) : 10;
    const offset = queryoffset ? parseInt(queryoffset) : 0;

    const supplies = await getAllSupplies(limit, offset);

    const response = new Response(
      true,
      "Insumos obtenidos exitosamente",
      supplies,
    );

    res.status(200);
    res.json(response.json);
  } catch (error) {

        console.error("Error obteniendo insumos:", error);

        const errorResponse = new Response(
            false,
            "Error interno del servidor",
            [{ message: error.message || "Ocurrió un error inesperado" }]
        );

        res.status(500);
        res.json(errorResponse.json);
    }
};

const getAllSuppliesById = async (req, res) => {

    try {

        const { id } = req.params;
        var errors = [];

        if (!id) {
            errors.push("El ID del insumo es obligatorio");
        }

        if (errors.length > 0) {

            var response = new Response(
                false,
                "Error al obtener el insumo",
                errors
            );

            res.status(400);
            res.json(response.json);
            return;
        }

        const supply = await getSupplyById(id);

        if (!supply) {

            var response = new Response(
                false,
                "El insumo no existe",
                []
            );

            res.status(404);
            res.json(response.json);
            return;
        }

        var response = new Response(
            true,
            "Insumo obtenido exitosamente",
            supply
        );

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error obteniendo insumo:", error);

        const errorResponse = new Response(
            false,
            "Error interno del servidor",
            [{ message: error.message || "Ocurrió un error inesperado" }]
        );

        res.status(500);
        res.json(errorResponse.json);
    }
};

const createSupply = async (req, res) => {

    try {

        const {
            id,
            supplyType,
            entryDate,
            supplyName,
            unitMeasure,
            quantity,
            unitValue,
            totalValue,
            reference,
            expirationDate,
            balance,
            observations,
            weight
        } = req.body;

        var errors = [];

        if (!id || id.trim() === "") {
            errors.push("El ID del insumo es obligatorio");
        }

        if (!supplyType || supplyType.trim() === "") {
            errors.push("El tipo de insumo es obligatorio");
        }

        if (!entryDate) {
            errors.push("La fecha de ingreso es obligatoria");
        }

        if (!supplyName || supplyName.trim() === "") {
            errors.push("El nombre del insumo es obligatorio");
        }

        if (!unitMeasure || unitMeasure.trim() === "") {
            errors.push("La unidad de medida es obligatoria");
        }

        if (quantity == null) {
            errors.push("La cantidad es obligatoria");
        }

        if (unitValue == null) {
            errors.push("El valor unitario es obligatorio");
        }

        if (totalValue == null) {
            errors.push("El valor total es obligatorio");
        }

        if (!reference || reference.trim() === "") {
            errors.push("La referencia es obligatoria");
        }

        if (!expirationDate) {
            errors.push("La fecha de vencimiento es obligatoria");
        }

        if (balance == null) {
            errors.push("El saldo es obligatorio");
        }

        if (weight == null) {
            errors.push("El peso es obligatorio");
        }

        if (errors.length > 0) {

            var response = new Response(
                false,
                "Error al crear el insumo",
                errors
            );

            res.status(400);
            return res.json(response.json);
        }

        const data = {
            id,
            supplyType,
            entryDate,
            supplyName,
            unitMeasure,
            quantity,
            unitValue,
            totalValue,
            reference,
            expirationDate,
            balance,
            observations,
            weight
        };

        const supply = await supplyCreate(data);

        var response = new Response(
            true,
            "Insumo creado exitosamente",
            supply
        );

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error creando insumo:", error);

        const errorResponse = new Response(
            false,
            "Error interno del servidor",
            [{ message: error.message || "Ocurrió un error inesperado" }]
        );

        res.status(500);
        res.json(errorResponse.json);
    }
};

const updateSupply = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            supplyType,
            entryDate,
            supplyName,
            unitMeasure,
            quantity,
            unitValue,
            totalValue,
            reference,
            expirationDate,
            balance,
            observations,
            weight
        } = req.body;

        var errors = [];

        if (!id) {
            errors.push("El ID del insumo es obligatorio");
        }

        if (!supplyType || supplyType.trim() === "") {
            errors.push("El tipo de insumo es obligatorio");
        }

        if (!entryDate) {
            errors.push("La fecha de ingreso es obligatoria");
        }

        if (!supplyName || supplyName.trim() === "") {
            errors.push("El nombre del insumo es obligatorio");
        }

        if (!unitMeasure || unitMeasure.trim() === "") {
            errors.push("La unidad de medida es obligatoria");
        }

        if (quantity == null) {
            errors.push("La cantidad es obligatoria");
        }

        if (unitValue == null) {
            errors.push("El valor unitario es obligatorio");
        }

        if (totalValue == null) {
            errors.push("El valor total es obligatorio");
        }

        if (!reference || reference.trim() === "") {
            errors.push("La referencia es obligatoria");
        }

        if (!expirationDate) {
            errors.push("La fecha de vencimiento es obligatoria");
        }

        if (balance == null) {
            errors.push("El saldo es obligatorio");
        }

        if (weight == null) {
            errors.push("El peso es obligatorio");
        }

        if (errors.length > 0) {

            var response = new Response(
                false,
                "Error al actualizar el insumo",
                errors
            );

            res.status(400);
            return res.json(response.json);
        }

        const data = {
            supplyType,
            entryDate,
            supplyName,
            unitMeasure,
            quantity,
            unitValue,
            totalValue,
            reference,
            expirationDate,
            balance,
            observations,
            weight
        };

        const supply = await supplyUpdate(id, data);

        var response = new Response(
            true,
            "Insumo actualizado exitosamente",
            supply
        );

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error actualizando insumo:", error);

        const errorResponse = new Response(
            false,
            "Error interno del servidor",
            [{ message: error.message || "Ocurrió un error inesperado" }]
        );

        res.status(500);
        res.json(errorResponse.json);
    }
};

const deleteSupply = async (req, res) => {

    try {

        const { id } = req.params;

        var errors = [];

        if (!id) {
            errors.push("El ID del insumo es obligatorio");
        }

        if (errors.length > 0) {

            var response = new Response(
                false,
                "Error al eliminar el insumo",
                errors
            );

            res.status(400);
            return res.json(response.json);
        }

        const supply = await supplyDelete(id);

        var response = new Response(
            true,
            "Insumo eliminado exitosamente",
            supply
        );

        res.status(201);
        res.json(response.json);

    } catch (error) {

        console.error("Error eliminando insumo:", error);

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
    getSupplies,
    getAllSuppliesById,
    createSupply,
    updateSupply,
    deleteSupply
};