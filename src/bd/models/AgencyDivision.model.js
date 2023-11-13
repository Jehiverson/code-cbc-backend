import {DataTypes} from "sequelize";
import { config } from "../functions/connect.js";

const AgencyDivision = config.define('AgencyDivision', {
  idAgencyDivision: {
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
  tableName: 'AgencyDivision',
  freezeTableName: true,
  timestamps: true
});

export default AgencyDivision;
