import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class Payment extends Model {
  public id!: number;
  public jobId!: number;
  public amount!: number;
  public operationDate!: Date;
}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    jobId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Job',
        key: 'id',
      },
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    operationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Payment',
    tableName: 'PAYMENT',
    timestamps: false,
  }
);
