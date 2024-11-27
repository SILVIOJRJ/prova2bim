import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Job } from './Job';

export class Payment extends Model {
  public id!: number;
  public jobId!: number;
  public operationDate!: Date;
  public paymentValue!: number;
}

Payment.init({
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
}, {
  sequelize,
  modelName: 'Payment',
  tableName: 'PAYMENT',
  timestamps: false,
});

Payment.belongsTo(Job, { foreignKey: 'jobId' });
