const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const visit = db.define("visit", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    visitDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    visitorName: {
        type: DataTypes.STRING,
        max: 50,
        min: 3,
        allowNull: false
    },
    institutionOrganization: {
        type: DataTypes.STRING,
        allowNull: false
    },
    visitReason: {
        type: DataTypes.STRING,
        allowNull: false
    },
    observations: {
        type: DataTypes.STRING,
        allowNull: false
    },
    responsiblePerson: {
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

module.exports = visit;