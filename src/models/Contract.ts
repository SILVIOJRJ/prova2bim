import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Profile } from './Profile';

export class Contract extends Model {
  public id!: number;
  public terms!: string;
  public clientId!: number;
  public contractorId!: number;
  public operationDate!: Date;
  public status!: string;
}

Contract.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  terms: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  clientId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Profile',
      key: 'id',
    },
    allowNull: false,
  },
  contractorId: {
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
  status: {
    type: DataTypes.STRING(11),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Contract',
  tableName: 'CONTRACT',
  timestamps: false,
});

Contract.belongsTo(Profile, { foreignKey: 'clientId', as: 'client' });
Contract.belongsTo(Profile, { foreignKey: 'contractorId', as: 'contractor' });
