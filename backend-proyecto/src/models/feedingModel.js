const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");
const supply = require("./supplyModel");
const stockEntry = require("./stockEntryModel");
const responsible = require("./responsibleModel");

// Alimentación: cada registro descuenta su cantidad de la salida (cantidad_salida)
// de una entrada de stock (stockEntry) y queda ligado a su insumo y a un responsable.
const feeding = db.define("feeding", {
    id_feeding: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_supply: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    id_stockEntry: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_responsable: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // Jornada: Mañana, Tarde o Noche
    shift: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    feedingDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    feedingTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    // Cantidad suministrada (en la unidad de la entrada de stock)
    quantity: {
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
        freezeTableName: true
    }
);

// Relaciones (llaves foráneas)
feeding.belongsTo(supply, { foreignKey: "id_supply", targetKey: "id_supply" });
feeding.belongsTo(stockEntry, { foreignKey: "id_stockEntry", targetKey: "id_stockEntry" });
feeding.belongsTo(responsible, { foreignKey: "id_responsable", targetKey: "id" });

module.exports = feeding;
