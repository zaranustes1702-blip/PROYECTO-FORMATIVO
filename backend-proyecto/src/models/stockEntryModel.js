const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");
const supply = require("./supplyModel");
const barn = require("./barnModel");

// Entrada (ingreso) de un insumo a un galpón: controla el stock por lote de ingreso.
// La cantidad de salida la va sumando el módulo de alimentación (feeding).
const stockEntry = db.define(
    "stockEntry",
    {
        id_stockEntry: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_supply: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        id_barn: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cantidad_inicial: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: { min: 0 }
        },
        cantidad_salida: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
            validate: { min: 0 }
        },
        disponible_entrada: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: { min: 0 }
        },
        // Tipo de la cantidad inicial (kg, bulto, litro, dosis, etc.)
        unid_entrada: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        vencimiento: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        precio_total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: { min: 0 }
        },
        precio_unitario: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: { min: 0 }
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
        tableName: "stockEntry",
        freezeTableName: true
    }
);

// Relaciones (llaves foráneas)
stockEntry.belongsTo(supply, { foreignKey: "id_supply", targetKey: "id_supply" });
stockEntry.belongsTo(barn, { foreignKey: "id_barn", targetKey: "id" });

module.exports = stockEntry;
