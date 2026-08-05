const mortality = require('../models/mortalityModel');

// crear registro de mortalidad
const MortalityCreate = async (data) => {
    try {
        const newMortality = await mortality.create(data);
        return newMortality;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// obtener todos los registros de mortalidad
const getAllMortalities = async () => {
    try {
        const mortalities = await mortality.findAll();
        return mortalities;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// obtener registro de mortalidad por id
const getMortalityById = async (id) => {
    try {
        const mortalityid = await mortality.findOne({
            where: { id }
        });
        return mortalityid;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// eliminar
const MortalityDelete = async (id) => {
    try {
        const mortalityDelete = await mortality.destroy({
            where: { id }
        });
        return mortalityDelete;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// actualizar registro de mortalidad
const MortalityUpdate = async (id, data) => {
    try {
        const mortalityUpdate = await mortality.update(data, { where: { id } });
        return mortalityUpdate;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
module.exports = {
    MortalityCreate,
    getAllMortalities,
    getMortalityById,
    MortalityDelete,
    MortalityUpdate
};
