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

module.exports = feeding;