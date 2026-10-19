
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
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            len: [3, 50]
        }
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
        allowNull: false,
        defaultValue: "Sin observaciones"
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