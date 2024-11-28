import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Contract } from './Contract';

export class Job extends Model {
  public id!: number;
  public contractId!: number;
  public description!: string;
  public operationDate!: Date;
  public paymentDate!: Date | null;
  public price!: number;
  public paid!: boolean;
  public balance!: number; // Novo campo balance
}

Job.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  contractId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Contract',
      key: 'id',
    },
  },
  description: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  operationDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  paymentDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  paid: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  balance: {
    type: DataTypes.DOUBLE, // Tipo do campo
    allowNull: false,
    defaultValue: 0, // Valor inicial padrão
  },
  
}, {
  sequelize,
  modelName: 'Job',
  tableName: 'JOB',
  timestamps: false,
});

Job.belongsTo(Contract, { foreignKey: 'contractId' });
