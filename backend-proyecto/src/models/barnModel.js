const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const barn = db.define("barn", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    barnName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    barnSize: {
        type: DataTypes.STRING,
        allowNull: false
    },
    maxBirdCapacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    birdBreed: {
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

module.exports = barn;