const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const birdbatch = db.define("birdbatch", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    entryDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    batchNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birdQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    batchWeight: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    birdAgeWeeks: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    appliedVaccines: {
        type: DataTypes.STRING,
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

module.exports = birdbatch;