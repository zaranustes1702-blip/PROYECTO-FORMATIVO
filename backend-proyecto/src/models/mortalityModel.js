const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const mortality = db.define("mortality", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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

module.exports = mortality;