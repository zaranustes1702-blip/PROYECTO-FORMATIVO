const weighing = require("../models/weighingModel");

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
const getAllWeighings = async () => {
    try {
        const weighings = await weighing.findAll();
        return weighings;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};

// Obtener pesaje por id
const getWeighingById = async (id) => {
    try {
        const weighingId = await weighing.findOne({
            where: { id }
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
            where: { id }
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