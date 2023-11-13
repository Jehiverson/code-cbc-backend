import {DataTypes} from "sequelize";
import { config } from "../functions/connect.js";

const Agency = config.define('Agency', {
  idAgency: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: DataTypes.STRING,
  state: DataTypes.ENUM('Activo', 'Inactivo'),
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  tableName: 'Agency',
  freezeTableName: true,
  timestamps: true
});

export default Agency;
