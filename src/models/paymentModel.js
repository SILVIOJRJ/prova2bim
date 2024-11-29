const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    operationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    paymentValue: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Payment;
