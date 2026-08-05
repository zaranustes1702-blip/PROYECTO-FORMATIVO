const responsible = require('../models/responsibleModel');

// crear responsable
const ResponsibleCreate = async (data) => {
    try {
        const newResponsible = await responsible.create(data);
        return newResponsible;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// obtener todos los responsables
const getAllResponsibles = async () => {
    try {
        const responsibles = await responsible.findAll();
        return responsibles;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// obtener responsable por id
const getResponsibleById = async (id) => {
    try {
        const responsibleid = await responsible.findOne({
            where: { id }
        });
        return responsibleid;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// eliminar
const ResponsibleDelete = async (id) => {
    try {
        const responsibleDelete = await responsible.destroy({
            where: { id }
        });
        return responsibleDelete;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// actualizar responsable
const ResponsibleUpdate = async (id, data) => {
    try {
        const responsibleUpdate = await responsible.update(data, { where: { id } });
        return responsibleUpdate;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
module.exports = {
    ResponsibleCreate,
    getAllResponsibles,
    getResponsibleById,
    ResponsibleDelete,
    ResponsibleUpdate
};
