const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");
const birdbatch = require("./birdBatchModel");
const supply = require("./supplyModel");

const quarantine = db.define("quarantine", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_lote: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_supply: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    quarantineDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    affectedBirds: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    symptoms: {
        type: DataTypes.STRING,
        allowNull: false
    },
    diagnosis: {
        type: DataTypes.STRING,
        allowNull: false
    },
    treatmentApplied: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dosage: {
        type: DataTypes.STRING,
        allowNull: false
    },
    treatmentDuration: {
        type: DataTypes.STRING,
        allowNull: false
    },
    observations: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    quarantineEndDate: {
        type: DataTypes.DATE
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
quarantine.belongsTo(birdbatch, { foreignKey: "id_lote", targetKey: "id" });
quarantine.belongsTo(supply, { foreignKey: "id_supply", targetKey: "id_supply" });

module.exports = quarantine;
