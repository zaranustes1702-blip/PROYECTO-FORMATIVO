const eggProduction = require('../models/eggProductionModel');

const createEggProductionService = async (data) => {
    try {
        const newEggProduction = await eggProduction.create(data);
        return newEggProduction;
    } catch (error) {
        console.error(error);
    }
}

const getAllEggProductions = async () => {
    try {
        const eggProductions = await eggProduction.findAll();
        return eggProductions;
    } catch (error) {
        console.error(error);
    }
};

const getIdEggProduction = async (id) => {
    try {
        const eggProductionId = await eggProduction.findOne({ where: { id } });
        return eggProductionId;
    } catch (error) {
        console.error(error);
    }
}

const deleteEggProduction = async (id) => {
    try {
        const deletedEggProduction = await eggProduction.destroy({ where: { id } });
        return deletedEggProduction;
    } catch (error) {
        console.error(error);
    }
}

const updateEggProduction = async (id, data) => {
    try {
        const updatedEggProduction = await eggProduction.update(data, { where: { id } });
        return updatedEggProduction;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getAllEggProductions,
    getIdEggProduction,
    createEggProductionService,
    updateEggProduction,
    deleteEggProduction
}