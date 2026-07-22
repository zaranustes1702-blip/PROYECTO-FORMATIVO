const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const feeding = db.define("feeding", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    feedingDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dailyConsumptionKg: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    remainingKg: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    remainingBags: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    shift: {
        type: DataTypes.STRING,
        allowNull: false
    },
    responsiblePerson: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = feeding;