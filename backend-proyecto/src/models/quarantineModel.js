const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const quarantine = db.define("quarantine", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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

module.exports = quarantine;