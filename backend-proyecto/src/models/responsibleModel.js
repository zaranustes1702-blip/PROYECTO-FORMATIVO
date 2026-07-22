const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const responsible = db.define("responsible", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    documentNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    trainingRecord: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    responsibleType: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = responsible;