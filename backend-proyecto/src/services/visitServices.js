const visit = require('../models/visitModel');


const visitCreate = async (data) => {
    try {
        const newVisit = await visit.create(data);
        return newVisit;
    }catch (error) {
        console.error(error);
    }
}

const getAllVisits = async (limit, offset) => {
    try {
        const visits = await visit.findAll({
            offset: offset,
            limit: limit
        });
        return visits;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getVisitById = async (id) => {
    try {
        const visitId = await visit.findOne({ where: { id } });
        return visitId;
    }catch (error) {
        console.error(error);
    }
}

const visitDelete = async (id) => {
    try {
        const deletedVisit = await visit.destroy({ where: { id } });
        return deletedVisit;
    }catch (error) {
        console.error(error);
    }
}

const visitUpdate = async (id, data) => {
    try {
        const updatedVisit = await visit.update(data, { where: { id } });
        return updatedVisit;
    }catch (error) {
        console.error(error);
    }
}

module.exports = {
    getAllVisits,
    getVisitById,
    visitCreate,
    visitUpdate,
    visitDelete
}   