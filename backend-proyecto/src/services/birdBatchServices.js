const birdBatch = require('../models/birdBatchModel');
const weighing = require('../models/weighingModel');

// Agrega a cada lote su peso promedio actual, tomado del último pesaje activo de ese
// lote en el módulo de pesajes. Se entrega para todo el lote (kg) = promedio por ave (g)
// x cantidad de aves / 1000, y también el promedio por ave (g) de referencia.
// Si el lote aún no tiene pesajes quedan en null.
const agregarPesoActual = async (lotes) => {
    if (lotes.length === 0) return [];

    const pesajes = await weighing.findAll({
        where: { id_birdBatch: lotes.map((lote) => lote.id), active: true },
        order: [["weighingDate", "DESC"], ["weighingTime", "DESC"], ["id", "DESC"]]
    });

    // El primero que aparece de cada lote es el más reciente
    const ultimoPeso = {};
    pesajes.forEach((pesaje) => {
        if (ultimoPeso[pesaje.id_birdBatch] === undefined) {
            ultimoPeso[pesaje.id_birdBatch] = pesaje.averageWeightGrams;
        }
    });

    return lotes.map((lote) => {
        const promedioGramos = ultimoPeso[lote.id] ?? null;

        return {
            ...lote.toJSON(),
            currentAverageWeightGrams: promedioGramos,
            currentAverageWeightKg: promedioGramos === null
                ? null
                : Number(((promedioGramos * lote.birdQuantity) / 1000).toFixed(2))
        };
    });
}

const BirdBatchCreate = async (data) => {
    try {
        const newBirdBatch = await birdBatch.create(data);
        return newBirdBatch;
    } catch (error) {
        console.error(error);
    }
}

const getAllBirdBatches = async (limit, offset) => {
    try {
        const birdBatches = await birdBatch.findAll({
            order: [["id", "DESC"]],
            offset: offset,
            limit: limit
        });
        return await agregarPesoActual(birdBatches);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getIdBirdBatch = async (id) => {
    try {
        const birdBatchId = await birdBatch.findOne({ where: { id } });
        if (!birdBatchId) return birdBatchId;
        const [conPeso] = await agregarPesoActual([birdBatchId]);
        return conPeso;
    } catch (error) {
        console.error(error);
    }
}

const BirdBatchDelete = async (id) => {
    try {
        const deletedBirdBatch = await birdBatch.destroy({ where: { id } });
        return deletedBirdBatch;
    } catch (error) {
        console.error(error);
    }
}

const BirdBatchUpdate = async (id, data) => {
    try {
        const updatedBirdBatch = await birdBatch.update(data, { where: { id } });
        return updatedBirdBatch;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getAllBirdBatches,
    getIdBirdBatch,
    BirdBatchCreate,
    BirdBatchUpdate,
    BirdBatchDelete
}