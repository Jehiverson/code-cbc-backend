import { DataTypes } from "sequelize";
import { config } from "../functions/connect.js";

const Division = config.define('Division', {
  idDivision: {
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
  tableName: 'Division',
  freezeTableName: true,
  timestamps: true
});

export default Division;