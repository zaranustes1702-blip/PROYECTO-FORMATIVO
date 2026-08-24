const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const health = db.define(
    "health",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        healthDate: {
            type: DataTypes.DATE,
            allowNull: false
        },

        vaccineQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        vaccineName: {
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

module.exports = health;