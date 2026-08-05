const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const eggproduction = db.define(
    "eggproduction",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        productionDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        productionHour: {
            type: DataTypes.TIME,
            allowNull: false
        },

        batch: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        birdQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        responsible: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        responsibleRole: {
            type: DataTypes.ENUM(
                "Gestor",
                "Instructor",
                "Pasante"
            ),
            allowNull: false
        },

        collectedAM: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        collectedPM: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        jumboEggs: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },

        aaaEggs: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },

        aaEggs: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },

        aEggs: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },

        bEggs: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },

        cEggs: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },

        brokenEggs: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },

        totalDay: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },

        goodEggs: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },

        weeklyEggTotal: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },

        productionPercentage: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        },

        observations: {
            type: DataTypes.STRING(255),
            allowNull: true
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

module.exports = eggproduction;