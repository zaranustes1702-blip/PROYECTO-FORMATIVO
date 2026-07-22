const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const birdBatch = db.define("birdBatch", {
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
    }
});

module.exports = birdBatch;