import {DataTypes} from "sequelize";
import { config } from "../functions/connect.js";

const Role = config.define('Role', {
  idRole: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.ENUM('Activo', 'Inactivo'),
    defaultValue: 'Activo'
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'Role',
  freezeTableName: true,
  timestamps: true,
});

export default Role;
