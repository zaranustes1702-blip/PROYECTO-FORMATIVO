const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");
const birdbatch = require("./birdBatchModel");
const responsible = require("./responsibleModel");

const mortality = db.define("mortality", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_lote: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_responsable: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mortalityDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    mortalityTime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dailyMortality: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    possibleCauseOfDeath: {
        type: DataTypes.STRING,
        allowNull: false
    },
    necropsyPerformed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    observations: {
        type: DataTypes.TEXT
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
mortality.belongsTo(birdbatch, { foreignKey: "id_lote", targetKey: "id" });
mortality.belongsTo(responsible, { foreignKey: "id_responsable", targetKey: "id" });

module.exports = mortality;
