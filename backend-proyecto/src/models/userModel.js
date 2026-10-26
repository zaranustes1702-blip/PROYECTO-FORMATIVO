const { DataTypes } = require("sequelize");
const { randomUUID } = require("crypto");
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
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false
    },

    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },

    documentId: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },

    postJob: {
      type: DataTypes.STRING(50),
      allowNull: false,
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

    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },

    salt: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    id_roll: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },

    resetPasswordToken: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },

    resetPasswordTokenExpires: {
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
    timestamps: true,
  },
);

module.exports = User;
