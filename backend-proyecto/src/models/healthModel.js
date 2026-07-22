const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const health = db.define("health", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    detectionDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    affectedBatch: {
        type: DataTypes.STRING,
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
    responsiblePerson: {
        type: DataTypes.STRING,
        allowNull: false
    },
    observations: {
        type: DataTypes.TEXT
    },
    recoveryDate: {
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

module.exports = health;