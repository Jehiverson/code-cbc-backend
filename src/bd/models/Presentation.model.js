import {DataTypes} from "sequelize";
import { config } from "../functions/connect.js";

const Presentation = config.define('Presentation', {
  idPresentation: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  state: DataTypes.ENUM('Activo', 'Inactivo'),
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  tableName: 'Presentation',
  freezeTableName: true,
  timestamps: true
});

export default Presentation;
