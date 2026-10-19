const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

// Insumos: solo hay dos tipos, medicamentos y alimentacion.
// La cantidad, los precios y el vencimiento se manejan en stockEntry.
const supply = db.define("supply", {
    id_supply: {
        type: DataTypes.STRING(10),
        primaryKey: true
    },
    supplyName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    supplyType: {
        type: DataTypes.ENUM("medicamentos", "alimentacion"),
        allowNull: false
    },
    reference: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    minimumStock: {
        type: DataTypes.DECIMAL(10, 2),
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

module.exports = supply;
