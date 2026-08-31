const { DataTypes } = require("sequelize");
const db = require("../config/conectionDB");

const User = db.define(
  "users",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    uuid: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    documentId: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },

    postJob: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    idroll: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    verifyEmail: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    solicito_newPassword: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "users",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = User;