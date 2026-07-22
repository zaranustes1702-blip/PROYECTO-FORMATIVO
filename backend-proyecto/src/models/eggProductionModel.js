const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const eggProduction = db.define("eggProduction", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productionDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    birdQuantity: {
        type: DataTypes.INTEGER,
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
    dailyProduction: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    brokenEggs: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    eggType: {
        type: DataTypes.STRING,
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
    weeklyEggTotal: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = eggProduction;