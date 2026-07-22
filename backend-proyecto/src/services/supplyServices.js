const supply = require('../models/supplyModel');

const createSupplyService = async (data) => {
    try {
        const newSupply = await supply.create(data);
        return newSupply;
    } catch (error) {
        console.error(error);
    }
}

const getAllSupplies = async () => {
    try {
        const supplies = await supply.findAll();
        return supplies;
    } catch (error) {
        console.error(error);
    }
};

const getIdSupply = async (id) => {
    try {
        const supplyId = await supply.findOne({ where: { id } });
        return supplyId;
    } catch (error) {
        console.error(error);
    }
}

const deleteSupply = async (id) => {
    try {
        const deletedSupply = await supply.destroy({ where: { id } });
        return deletedSupply;
    } catch (error) {
        console.error(error);
    }
}

const updateSupply = async (id, data) => {
    try {
        const updatedSupply = await supply.update(data, { where: { id } });
        return updatedSupply;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getAllSupplies,
    getIdSupply,
    createSupplyService,
    updateSupply,
    deleteSupply
}