const eggProduction = require("../models/eggProductionModel");

const EggProductionCreate = async (data) => {
    try {
        const newEggProduction = await eggProduction.create(data);
        return newEggProduction;
    } catch (error) {
        console.error(error);
    }
};

const getAllEggProductions = async (limit, offset) => {
    try {
        const eggProductions = await eggProduction.findAll({
            offset: offset,
            limit: limit
        });
        return eggProductions;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
const getEggProductionById = async (id) => {
    try {
        const eggProductionId = await eggProduction.findOne({
            where: { id }
        });

        return eggProductionId;
    } catch (error) {
        console.error(error);
    }
};

const EggProductionDelete = async (id) => {
    try {
        const deletedEggProduction = await eggProduction.destroy({
            where: { id }
        });

        return deletedEggProduction;
    } catch (error) {
        console.error(error);
    }
};

const EggProductionUpdate = async (id, data) => {
    try {
        const updatedEggProduction = await eggProduction.update(
            data,
            {
                where: { id }
            }
        );

        return updatedEggProduction;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    getAllEggProductions,
    getEggProductionById,
    EggProductionCreate,
    EggProductionUpdate,
    EggProductionDelete
};