const weighing = require("../models/weighingModel");
const birdBatch = require("../models/birdBatchModel");

// Lote relacionado que se muestra junto a cada pesaje
const relaciones = [
    { model: birdBatch, attributes: ["id", "batchNumber"] }
];

const WeighingCreate = async (data) => {
    try {
        const newWeighing = await weighing.create(data);
        return newWeighing;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};

// Obtener todos los pesajes
const getAllWeighings = async (limit, offset) => {
    try {
        const weighings = await weighing.findAll({
            include: relaciones,
            order: [["id", "DESC"]],
            offset: offset,
            limit: limit
        });
        return weighings;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Obtener pesaje por id
const getWeighingById = async (id) => {
    try {
        const weighingId = await weighing.findOne({
            where: { id },
            include: relaciones
        });

        return weighingId;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};

// Eliminar pesaje
const WeighingDelete = async (id) => {
    try {
        const deletedWeighing = await weighing.destroy({
            where: { id }
        });

        return deletedWeighing;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};

// Actualizar pesaje
const WeighingUpdate = async (id, data) => {
    try {

        await weighing.update(
            data,
            {
                where: { id }
            }
        );

        const updatedWeighing = await weighing.findOne({
            where: { id },
            include: relaciones
        });

        return updatedWeighing;

    }
    catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    WeighingCreate,
    getAllWeighings,
    getWeighingById,
    WeighingDelete,
    WeighingUpdate
};