const mortality = require("../models/mortalityModel");
const birdbatch = require("../models/birdBatchModel");
const responsible = require("../models/responsibleModel");

// Datos relacionados que se muestran junto a cada registro
const relaciones = [
    { model: birdbatch, attributes: ["id", "batchNumber", "birdQuantity"] },
    { model: responsible, attributes: ["id", "fullName"] }
];

// crear registro de mortalidad
const MortalityCreate = async (data) => {
    try {
        const nuevo = await mortality.create(data);
        return nuevo;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// obtener todos
const getAllMortalities = async (limit, offset) => {
    try {
        const lista = await mortality.findAll({
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
const getMortalityById = async (id) => {
    try {
        const registro = await mortality.findOne({
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
const MortalityDelete = async (id) => {
    try {
        const eliminado = await mortality.destroy({
            where: { id }
        });
        return eliminado;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// actualizar
const MortalityUpdate = async (id, data) => {
    try {
        const actualizado = await mortality.update(data, { where: { id } });
        return actualizado;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    MortalityCreate,
    getAllMortalities,
    getMortalityById,
    MortalityDelete,
    MortalityUpdate
};
