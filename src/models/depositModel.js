const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const Deposit = sequelize.define(
  "Deposit",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    operationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    depositValue: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Deposit;
