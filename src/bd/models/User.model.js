import {DataTypes} from "sequelize";
import { config } from "../functions/connect.js";

import Role from "./Role.model.js";

const User = config.define('User', {
  idUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  idRole: DataTypes.INTEGER,
  name: {
    type: DataTypes.STRING,
  },
  user: {
    type: DataTypes.STRING,
  },
  password: {
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
  tableName: 'User',
  freezeTableName: true,
  timestamps: true,
});

User.belongsTo(Role, { foreignKey: 'idRole' });


export default User;
