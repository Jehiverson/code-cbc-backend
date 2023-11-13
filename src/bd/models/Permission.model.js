import {DataTypes} from "sequelize";
import { config } from "../functions/connect.js";

const Permission = config.define('Permission', {
  idPermission: {
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
  tableName: 'Permission',
  freezeTableName: true,
  timestamps: true
});

export default Permission;
