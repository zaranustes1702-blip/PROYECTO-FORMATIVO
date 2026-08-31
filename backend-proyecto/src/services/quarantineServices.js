const quarantine = require('../models/quarantineModel');

// crear cuarentena
const QuarantineCreate = async (data) => {
    try {
        const newQuarantine = await quarantine.create(data);
        return newQuarantine;
    } catch (error) {
        console.log(error);
        throw error;
    }
}  

// obtener todos los usuarios
const getAllQuarantines = async (limit, offset) => {
    try {
        const quarantines = await quarantine.findAll({
            offset: offset,
            limit: limit
        });
        return quarantines;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// obtener cuarentena por id
const getQuarantineById = async (id) => {
    try {
        const quarantineid = await quarantine.findOne({
            where: { id }
        });
        return quarantineid;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// eliminar cuarentena
const QuarantineDelete = async (id) => {
    try {
        const quarantineDelete = await quarantine.destroy({
            where: { id }
        });
        return quarantineDelete;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// actualizar cuarentena
const QuarantineUpdate = async (id, data) => {
    try {
        const QuarantineUpdate = await quarantine.update(data, { where: { id } });
        return QuarantineUpdate;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
module.exports = {
    QuarantineCreate,
    getAllQuarantines,
    getQuarantineById,
    QuarantineDelete,
    QuarantineUpdate
};
