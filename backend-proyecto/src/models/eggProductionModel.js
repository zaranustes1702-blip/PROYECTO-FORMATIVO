const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");
const birdbatch = require("./birdBatchModel");
const responsible = require("./responsibleModel");

// Producción de huevos: cantidades por tipo de huevo en la mañana (Am) y en la tarde (Pm).
// Los totales se calculan en el controlador.
const eggproduction = db.define(
    "eggproduction",
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

        id_responsibleAm: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        id_responsiblePm: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        hourAm: {
            type: DataTypes.TIME,
            allowNull: false
        },

        hourPm: {
            type: DataTypes.TIME,
            allowNull: false
        },

        shift: {
            type: DataTypes.STRING(20),
            allowNull: false
        },

        jumboEggsAm: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        aaaEggsAm: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        aaEggsAm: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        aEggsAm: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        bEggsAm: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        cEggsAm: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        brokenEggsAm: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        goodEggsAm: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        totalAm: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        jumboEggsPm: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        aaaEggsPm: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        aaEggsPm: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        aEggsPm: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        bEggsPm: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        cEggsPm: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        brokenEggsPm: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        goodEggsPm: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        totalPm: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        brokenEggs: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        goodEggs: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        totalDay: {
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

// Relaciones (llaves foráneas)
eggproduction.belongsTo(birdbatch, { foreignKey: "id_lote", targetKey: "id" });
eggproduction.belongsTo(responsible, { as: "responsibleAm", foreignKey: "id_responsibleAm", targetKey: "id" });
eggproduction.belongsTo(responsible, { as: "responsiblePm", foreignKey: "id_responsiblePm", targetKey: "id" });

module.exports = eggproduction;
