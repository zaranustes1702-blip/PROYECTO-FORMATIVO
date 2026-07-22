const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const supply = db.define("supply", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    supplyDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    supplyType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    supplyName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING
    },
    unitMeasure: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stockQuantity: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    unitValue: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    totalValue: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    reference: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expirationDate: {
        type: DataTypes.DATE
    },
    supplier: {
        type: DataTypes.STRING,
        allowNull: false
    },
    storageLocation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    responsiblePerson: {
        type: DataTypes.STRING,
        allowNull: false
    },
    observations: {
        type: DataTypes.TEXT
    }
});

module.exports = supply;