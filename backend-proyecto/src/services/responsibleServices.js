const responsible = require('../models/responsibleModel');

const createResponsibleService = async (data) => {
    try {
        const newResponsible = await responsible.create(data);
        return newResponsible;
    } catch (error) {
        console.error(error);
    }
}

const getAllResponsibles = async () => {
    try {
        const responsibles = await responsible.findAll();
        return responsibles;
    } catch (error) {
        console.error(error);
    }
};

const getIdResponsible = async (id) => {
    try {
        const responsibleId = await responsible.findOne({ where: { id } });
        return responsibleId;
    } catch (error) {
        console.error(error);
    }
}

const deleteResponsible = async (id) => {
    try {
        const deletedResponsible = await responsible.destroy({ where: { id } });
        return deletedResponsible;
    } catch (error) {
        console.error(error);
    }
}

const updateResponsible = async (id, data) => {
    try {
        const updatedResponsible = await responsible.update(data, { where: { id } });
        return updatedResponsible;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getAllResponsibles,
    getIdResponsible,
    createResponsibleService,
    updateResponsible,
    deleteResponsible
}