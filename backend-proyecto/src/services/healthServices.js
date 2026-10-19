const health = require("../models/healthModel");
const birdbatch = require("../models/birdBatchModel");
const supply = require("../models/supplyModel");

// Datos relacionados que se muestran junto a cada registro
const relaciones = [
    { model: birdbatch, attributes: ["id", "batchNumber", "birdQuantity"] },
    { model: supply, attributes: ["id_supply", "supplyName", "supplyType"] }
];

// crear registro de sanidad
const HealthCreate = async (data) => {
    try {
        const nuevo = await health.create(data);
        return nuevo;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// obtener todos
const getAllHealths = async (limit, offset) => {
    try {
        const lista = await health.findAll({
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
const getHealthById = async (id) => {
    try {
        const registro = await health.findOne({
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
const HealthDelete = async (id) => {
    try {
        const eliminado = await health.destroy({
            where: { id }
        });
        return eliminado;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// actualizar
const HealthUpdate = async (id, data) => {
    try {
        const actualizado = await health.update(data, { where: { id } });
        return actualizado;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    HealthCreate,
    getAllHealths,
    getHealthById,
    HealthDelete,
    HealthUpdate
};
