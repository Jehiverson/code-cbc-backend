import {DataTypes} from "sequelize";
import { config } from "../functions/connect.js";

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
PermissionRole.belongsTo(config.model('Permission'), { foreignKey: 'idPermission' });
PermissionRole.belongsTo(config.model('Role'), { foreignKey: 'idRole' });

export default PermissionRole;
