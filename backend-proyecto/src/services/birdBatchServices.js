const birdBatch = require('../models/birdBatchModel');

const BirdBatchCreate = async (data) => {
    try {
        const newBirdBatch = await birdBatch.create(data);
        return newBirdBatch;
    } catch (error) {
        console.error(error);
    }
}

const getAllBirdBatches = async (limit, offset) => {
    try {
        const birdBatches = await birdBatch.findAll({
            offset: offset,
            limit: limit
        });
        return birdBatches;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getIdBirdBatch = async (id) => {
    try {
        const birdBatchId = await birdBatch.findOne({ where: { id } });
        return birdBatchId;
    } catch (error) {
        console.error(error);
    }
}

const BirdBatchDelete = async (id) => {
    try {
        const deletedBirdBatch = await birdBatch.destroy({ where: { id } });
        return deletedBirdBatch;
    } catch (error) {
        console.error(error);
    }
}

const BirdBatchUpdate = async (id, data) => {
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
    BirdBatchCreate,
    BirdBatchUpdate,
    BirdBatchDelete
}