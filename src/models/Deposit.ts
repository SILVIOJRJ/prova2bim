import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Profile } from './Profile';

export class Deposit extends Model {
  public id!: number;
  public clientId!: number;
  public operationDate!: Date;
  public depositValue!: number;
}

Deposit.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  clientId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Profile',
      key: 'id',
    },
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
}, {
  sequelize,
  modelName: 'Deposit',
  tableName: 'DEPOSIT',
  timestamps: false,
});

Deposit.belongsTo(Profile, { foreignKey: 'clientId' });
