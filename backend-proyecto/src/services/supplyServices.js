const supply = require("../models/supplyModel");

const supplyCreate = async (data) => {
    try {
        const newSupply = await supply.create(data);
        return newSupply;
    } catch (error) {
        console.error(error);
    }
};

const getAllSupplies = async (limit, offset) => {
    try {
        const supplies = await supply.findAll({
            offset: offset,
            limit: limit
        });
        return supplies;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getSupplyById = async (id) => {
    try {
        const supplyId = await supply.findOne({
            where: { id }
        });
        return supplyId;
    } catch (error) {
        console.error(error);
    }
};

const supplyDelete = async (id) => {
    try {
        const deletedSupply = await supply.destroy({
            where: { id }
        });
        return deletedSupply;
    } catch (error) {
        console.error(error);
    }
};

const supplyUpdate = async (id, data) => {
    try {
        const updatedSupply = await supply.update(
            data,
            {
                where: { id }
            }
        );
        return updatedSupply;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    getAllSupplies,
    getSupplyById,
    supplyCreate,
    supplyUpdate,
    supplyDelete
};