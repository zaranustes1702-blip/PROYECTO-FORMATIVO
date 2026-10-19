const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");
const birdBatch = require("./birdBatchModel");

const weighing = db.define("weighing", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // Lote de aves al que pertenece el pesaje (permite NULL por los pesajes anteriores)
    id_birdBatch: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    weighingDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    weighingTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    responsiblePerson: {
        type: DataTypes.STRING,
        allowNull: false
    },
    weighedBirds: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalWeightKg: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    averageWeightGrams: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    batchUniformityPercentage: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
    },
    {
        freezeTableName: true
    }
);

// Relaciones (llaves foráneas)
weighing.belongsTo(birdBatch, { foreignKey: "id_birdBatch", targetKey: "id" });

module.exports = weighing;