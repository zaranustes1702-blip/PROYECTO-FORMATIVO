const birdBatch = require('../models/birdBatchModel');

const createBirdBatchService = async (data) => {
    try {
        const newBirdBatch = await birdBatch.create(data);
        return newBirdBatch;
    } catch (error) {
        console.error(error);
    }
}

const getAllBirdBatches = async () => {
    try {
        const birdBatches = await birdBatch.findAll();
        return birdBatches;
    } catch (error) {
        console.error(error);
    }
};

const getIdBirdBatch = async (id) => {
    try {
        const birdBatchId = await birdBatch.findOne({ where: { id } });
        return birdBatchId;
    } catch (error) {
        console.error(error);
    }
}

const deleteBirdBatch = async (id) => {
    try {
        const deletedBirdBatch = await birdBatch.destroy({ where: { id } });
        return deletedBirdBatch;
    } catch (error) {
        console.error(error);
    }
}

const updateBirdBatch = async (id, data) => {
    try {
        const updatedBirdBatch = await birdBatch.update(data, { where: { id } });
        return updatedBirdBatch;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getAllBirdBatches,
    getIdBirdBatch,
    createBirdBatchService,
    updateBirdBatch,
    deleteBirdBatch
}