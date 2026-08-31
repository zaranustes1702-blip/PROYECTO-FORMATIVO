const feeding = require('../models/feedingModel');

// crear alimentación
const FeedingCreate = async (data) => {
    try {
        const newFeeding = await feeding.create(data);
        return newFeeding;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// obtener todas las alimentaciones
const getAllFeedings = async (limit, offset) => {
    try {
        const feedings = await feeding.findAll({
            offset: offset,
            limit: limit
        });
        return feedings;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
// obtener alimentación por id
const getFeedingById = async (id) => {
    try {
        const feedingid = await feeding.findOne({
            where: { id }
        });
        return feedingid;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// eliminar
const FeedingDelete = async (id) => {
    try {
        const feedingDelete = await feeding.destroy({
            where: { id }
        });
        return feedingDelete;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// actualizar alimentación
const FeedingUpdate = async (id, data) => {
    try {
        const feedingUpdate = await feeding.update(data, { where: { id } });
        return feedingUpdate;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
module.exports = {
    FeedingCreate,
    getAllFeedings,
    getFeedingById,
    FeedingDelete,
    FeedingUpdate
};
