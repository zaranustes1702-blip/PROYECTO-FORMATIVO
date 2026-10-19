const stockEntry = require("../models/stockEntryModel");
const supply = require("../models/supplyModel");
const barn = require("../models/barnModel");

// Datos del insumo y del galpón que se muestran en cada entrada
const relaciones = [
    { model: supply, attributes: ["id_supply", "supplyName", "supplyType"] },
    { model: barn, attributes: ["id", "barnName"] }
];

// crear entrada
const stockEntryCreate = async (data) => {
    try {
        const newEntry = await stockEntry.create(data);
        return newEntry;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// obtener todas las entradas
const getAllStockEntries = async (limit, offset) => {
    try {
        const entries = await stockEntry.findAll({
            include: relaciones,
            order: [["id_stockEntry", "DESC"]],
            offset: offset,
            limit: limit
        });
        return entries;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// obtener entrada por id
const getStockEntryById = async (id) => {
    try {
        const entry = await stockEntry.findOne({
            where: { id_stockEntry: id },
            include: relaciones
        });
        return entry;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// actualizar entrada
const stockEntryUpdate = async (id, data) => {
    try {
        const updated = await stockEntry.update(data, {
            where: { id_stockEntry: id }
        });
        return updated;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// eliminar entrada
const stockEntryDelete = async (id) => {
    try {
        const deleted = await stockEntry.destroy({
            where: { id_stockEntry: id }
        });
        return deleted;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// cuántas entradas tiene un insumo (para no dejar borrarlo si ya tiene)
const countStockEntriesBySupply = async (id_supply) => {
    try {
        const total = await stockEntry.count({ where: { id_supply } });
        return total;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    getAllStockEntries,
    getStockEntryById,
    stockEntryCreate,
    stockEntryUpdate,
    stockEntryDelete,
    countStockEntriesBySupply
};
