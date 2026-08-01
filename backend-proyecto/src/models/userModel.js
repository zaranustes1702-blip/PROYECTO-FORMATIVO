const {DataTypes} = require("sequelize");
const db = require("../config/conectionDB");

const user = db.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        max: 50,
        min: 3,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    documentId: {
        type: DataTypes.STRING,
        max: 50,
        min: 3,
        unique: true,
        allowNull: false
    },
    postJob: {
        type: DataTypes.STRING,
        max: 50,
        min: 3,
        allowNull: false
    },
    verifyEmail: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
module.exports = user;
