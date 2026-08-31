const barn = require('../models/barnModel');

// crear lote
const BarnCreate = async (data) => {
    try {
        const newBarn = await barn.create(data);
        return newBarn;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// obtener todos los lotes
const getAllBarns = async (limit, offset) => {
    try {
        const barns = await barn.findAll({
            offset: offset,
            limit: limit
        });
        return barns;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
// obtener lote por id
const getBarnById = async (id) => {
    try {
        const barnid = await barn.findOne({
            where: { id }
        });
        return barnid;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// eliminar 
const BarnDelete = async (id) => {
    try {
        const barnDelete = await barn.destroy({
            where: { id }
        });
        return barnDelete;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// actualizar lote
const BarnUpdate = async (id, data) => {
    try {
        const barnUpdate = await barn.update(data, { where: { id } });
        return barnUpdate;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
module.exports = {
    BarnCreate,
    getAllBarns,
    getBarnById,
    BarnDelete,
    BarnUpdate
};