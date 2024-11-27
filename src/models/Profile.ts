import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class Profile extends Model {
  public id!: number;
  public firstname!: string;
  public lastname!: string;
  public profession!: string;
  public balance!: number;
  public type!: string;
}

Profile.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstname: DataTypes.STRING,
  lastname: DataTypes.STRING,
  profession: DataTypes.STRING,
  balance: DataTypes.DOUBLE,
  type: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'Profile',
  tableName: 'PROFILE',
  timestamps: false
});
