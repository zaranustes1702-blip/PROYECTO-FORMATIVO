const quarantine = require("../models/quarantineModel");
const birdbatch = require("../models/birdBatchModel");
const supply = require("../models/supplyModel");

// Datos relacionados que se muestran junto a cada registro
const relaciones = [
    { model: birdbatch, attributes: ["id", "batchNumber", "birdQuantity"] },
    { model: supply, attributes: ["id_supply", "supplyName", "supplyType"] }
];

// crear registro de cuarentena
const QuarantineCreate = async (data) => {
    try {
        const nuevo = await quarantine.create(data);
        return nuevo;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// obtener todos
const getAllQuarantines = async (limit, offset) => {
    try {
        const lista = await quarantine.findAll({
            include: relaciones,
            order: [["id", "DESC"]],
            offset: offset,
            limit: limit
        });
        return lista;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// obtener por id
const getQuarantineById = async (id) => {
    try {
        const registro = await quarantine.findOne({
            where: { id },
            include: relaciones
        });
        return registro;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// eliminar
const QuarantineDelete = async (id) => {
    try {
        const eliminado = await quarantine.destroy({
            where: { id }
        });
        return eliminado;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// actualizar
const QuarantineUpdate = async (id, data) => {
    try {
        const actualizado = await quarantine.update(data, { where: { id } });
        return actualizado;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    QuarantineCreate,
    getAllQuarantines,
    getQuarantineById,
    QuarantineDelete,
    QuarantineUpdate
};
