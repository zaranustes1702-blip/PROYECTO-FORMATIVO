const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const weighing = db.define("weighing", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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

module.exports = weighing;