import {DataTypes} from "sequelize";
import { config } from "../functions/connect.js";
import Division from "./Division.model.js";

const Area = config.define('Area', {
  idArea: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  idDivision: DataTypes.INTEGER,
  name: DataTypes.STRING,
  state: DataTypes.ENUM('Activo', 'Inactivo'),
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  tableName: 'Area',
  freezeTableName: true,
  timestamps: true
});

Area.belongsTo(Division, {foreignKey: "idDivision"})
Division.hasMany(Area, {foreignKey: "idDivision"})

export default Area;
