import {DataTypes} from "sequelize";
import { config } from "../functions/connect.js";

import Role from "./Role.model.js";
import Permission from "./Permission.model.js";

const PermissionRole = config.define('PermissionRole', {
  idPermissionRole: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  idPermission: DataTypes.INTEGER,
  idRole: DataTypes.INTEGER,
  state: DataTypes.ENUM('Activo', 'Inactivo'),
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  tableName: 'PermissionRole',
  freezeTableName: true,
  timestamps: true
});

// Relaciones
PermissionRole.belongsTo(Permission, { foreignKey: 'idPermission' });
PermissionRole.belongsTo(Role, { foreignKey: 'idRole' });

export default PermissionRole;
