import {DataTypes} from "sequelize";
import { config } from "../functions/connect.js";

const Area = config.define('Area', {
  idArea: {
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
  tableName: 'Area',
  freezeTableName: true,
  timestamps: true
});

export default Area;
