const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const Job = sequelize.define(
  "Job",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    contractId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    operationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    paymentDate: {
      type: DataTypes.DATE,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    paid: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Job;
