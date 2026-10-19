const feeding = require("../models/feedingModel");
const stockEntry = require("../models/stockEntryModel");
const supply = require("../models/supplyModel");
const responsible = require("../models/responsibleModel");

// Datos que se muestran junto a cada alimentación
const relaciones = [
    { model: supply, attributes: ["id_supply", "supplyName", "supplyType"] },
    { model: stockEntry, attributes: ["id_stockEntry", "unid_entrada"] },
    { model: responsible, attributes: ["id", "fullName"] }
];

// Suma (cantidad positiva) o devuelve (cantidad negativa) stock a la
// cantidad de salida de una entrada y recalcula lo disponible:
// disponible = cantidad inicial - cantidad de salida
const moverStock = async (id_stockEntry, cantidad) => {
    const entrada = await stockEntry.findOne({
        where: { id_stockEntry: id_stockEntry }
    });

    const salida = Number((Number(entrada.cantidad_salida) + cantidad).toFixed(2));
    const disponible = Number((Number(entrada.cantidad_inicial) - salida).toFixed(2));

    await stockEntry.update(
        { cantidad_salida: salida, disponible_entrada: disponible },
        { where: { id_stockEntry: id_stockEntry } }
    );
};

// crear alimentación (suma la cantidad a la salida de la entrada)
const FeedingCreate = async (data) => {
    try {
        const newFeeding = await feeding.create(data);
        await moverStock(data.id_stockEntry, Number(data.quantity));
        return newFeeding;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// obtener todas las alimentaciones
const getAllFeedings = async (limit, offset) => {
    try {
        const feedings = await feeding.findAll({
            include: relaciones,
            order: [["id_feeding", "DESC"]],
            offset: offset,
            limit: limit
        });
        return feedings;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// obtener alimentación por id
const getFeedingById = async (id) => {
    try {
        const feedingid = await feeding.findOne({
            where: { id_feeding: id },
            include: relaciones
        });
        return feedingid;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// cuántas alimentaciones tiene una entrada (para no dejar borrarla si ya tiene)
const countFeedingsByStockEntry = async (id_stockEntry) => {
    try {
        const total = await feeding.count({ where: { id_stockEntry } });
        return total;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// actualizar alimentación (devuelve lo anterior y descuenta lo nuevo)
const FeedingUpdate = async (id, data) => {
    try {
        const actual = await feeding.findOne({ where: { id_feeding: id } });

        await moverStock(actual.id_stockEntry, -Number(actual.quantity));
        await moverStock(data.id_stockEntry, Number(data.quantity));

        const feedingUpdate = await feeding.update(data, {
            where: { id_feeding: id }
        });
        return feedingUpdate;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// eliminar alimentación (devuelve la cantidad a la entrada)
const FeedingDelete = async (id) => {
    try {
        const actual = await feeding.findOne({ where: { id_feeding: id } });

        await moverStock(actual.id_stockEntry, -Number(actual.quantity));

        const feedingDelete = await feeding.destroy({
            where: { id_feeding: id }
        });
        return feedingDelete;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    FeedingCreate,
    getAllFeedings,
    getFeedingById,
    countFeedingsByStockEntry,
    FeedingDelete,
    FeedingUpdate
};
