const health = require('../models/healthModel');

// crear registro de salud
const HealthCreate = async (data) => {
    try {
        const newHealth = await health.create(data);
        return newHealth;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// obtener todos los registros de salud
const getAllHealths = async (limit, offset) => {
    try {
        const healths = await health.findAll({
            offset: offset,
            limit: limit
        });
        return healths;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
// obtener registro de salud por id
const getHealthById = async (id) => {
    try {
        const healthId = await health.findOne({
            where: { id }
        });
        return healthId;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// eliminar registro de salud
const HealthDelete = async (id) => {
    try {
        const healthDelete = await health.destroy({
            where: { id }
        });
        return healthDelete;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// actualizar registro de salud
const HealthUpdate = async (id, data) => {
    try {
        const healthUpdate = await health.update(data, { where: { id } });
        return healthUpdate;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
module.exports = {
    HealthCreate,
    getAllHealths,
    getHealthById,
    HealthDelete,
    HealthUpdate
};