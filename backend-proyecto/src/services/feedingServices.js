const feeding = require('../models/feedingModel');

const createFeedingService = async (data) => {
    try {
        const newFeeding = await feeding.create(data);
        return newFeeding;
    } catch (error) {
        console.error(error);
    }
}

const getAllFeedings = async () => {
    try {
        const feedings = await feeding.findAll();
        return feedings;
    } catch (error) {
        console.error(error);
    }
};

const getIdFeeding = async (id) => {
    try {
        const feedingId = await feeding.findOne({ where: { id } });
        return feedingId;
    } catch (error) {
        console.error(error);
    }
}

const deleteFeeding = async (id) => {
    try {
        const deletedFeeding = await feeding.destroy({ where: { id } });
        return deletedFeeding;
    } catch (error) {
        console.error(error);
    }
}

const updateFeeding = async (id, data) => {
    try {
        const updatedFeeding = await feeding.update(data, { where: { id } });
        return updatedFeeding;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getAllFeedings,
    getIdFeeding,
    createFeedingService,
    updateFeeding,
    deleteFeeding
}