const mortality = require('../models/mortalityModel');

const createMortalityService = async (data) => {
    try {
        const newMortality = await mortality.create(data);
        return newMortality;
    } catch (error) {
        console.error(error);
    }
}

const getAllMortalities = async () => {
    try {
        const mortalities = await mortality.findAll();
        return mortalities;
    } catch (error) {
        console.error(error);
    }
};

const getIdMortality = async (id) => {
    try {
        const mortalityId = await mortality.findOne({ where: { id } });
        return mortalityId;
    } catch (error) {
        console.error(error);
    }
}

const deleteMortality = async (id) => {
    try {
        const deletedMortality = await mortality.destroy({ where: { id } });
        return deletedMortality;
    } catch (error) {
        console.error(error);
    }
}

const updateMortality = async (id, data) => {
    try {
        const updatedMortality = await mortality.update(data, { where: { id } });
        return updatedMortality;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getAllMortalities,
    getIdMortality,
    createMortalityService,
    updateMortality,
    deleteMortality
}