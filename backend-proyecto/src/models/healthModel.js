const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");
const birdbatch = require("./birdBatchModel");
const supply = require("./supplyModel");

const health = db.define(
    "health",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        id_lote: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        id_supply: {
            type: DataTypes.STRING(10),
            allowNull: false
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

// Relaciones (llaves foráneas)
health.belongsTo(birdbatch, { foreignKey: "id_lote", targetKey: "id" });
health.belongsTo(supply, { foreignKey: "id_supply", targetKey: "id_supply" });

module.exports = health;
