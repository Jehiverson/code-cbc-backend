import {DataTypes} from "sequelize";
import { config } from "../functions/connect.js";
import User from "./User.model.js";
import Role from "./Role.model.js";

const RoleUser = config.define('RoleUser', {
  idRoleUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  idRole: {
    type: DataTypes.INTEGER,
  },
  idUser: {
    type: DataTypes.INTEGER,
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
  tableName: 'RoleUser',
  freezeTableName: true,
  timestamps: true,
});

RoleUser.belongsTo(User, {foreignKey: "idUser"});
User.hasMany(RoleUser, {foreignKey: "idUser"})

RoleUser.belongsTo(Role, {foreignKey: "idRole"});
Role.hasMany(RoleUser, {foreignKey: "idRole"})

export default RoleUser;
