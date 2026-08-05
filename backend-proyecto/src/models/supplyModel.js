const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const supply = db.define(
    "supply",
    {
        id: {
            type: DataTypes.STRING(10),
            primaryKey: true,
            allowNull: false
        },
        supplyType: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        entryDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        supplyName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        unitMeasure: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        unitValue: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        totalValue: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        reference: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        expirationDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        balance: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        observations: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        weight: {
            type: DataTypes.DECIMAL(10, 2),
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

module.exports = supply;