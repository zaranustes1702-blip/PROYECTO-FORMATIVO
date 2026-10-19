const eggproduction = require("../models/eggProductionModel");
const birdbatch = require("../models/birdBatchModel");
const responsible = require("../models/responsibleModel");

// Datos relacionados que se muestran junto a cada registro
const relaciones = [
    { model: birdbatch, attributes: ["id", "batchNumber", "birdQuantity"] },
    { model: responsible, as: "responsibleAm", attributes: ["id", "fullName"] },
    { model: responsible, as: "responsiblePm", attributes: ["id", "fullName"] }
];

// crear registro de producción
const EggProductionCreate = async (data) => {
    try {
        const nuevo = await eggproduction.create(data);
        return nuevo;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// obtener todos
const getAllEggProductions = async (limit, offset) => {
    try {
        const lista = await eggproduction.findAll({
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
const getEggProductionById = async (id) => {
    try {
        const registro = await eggproduction.findOne({
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
const EggProductionDelete = async (id) => {
    try {
        const eliminado = await eggproduction.destroy({
            where: { id }
        });
        return eliminado;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// actualizar
const EggProductionUpdate = async (id, data) => {
    try {
        const actualizado = await eggproduction.update(data, { where: { id } });
        return actualizado;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    EggProductionCreate,
    getAllEggProductions,
    getEggProductionById,
    EggProductionDelete,
    EggProductionUpdate
};
