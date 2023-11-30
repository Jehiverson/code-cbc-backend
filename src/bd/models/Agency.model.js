import { DataTypes } from "sequelize";
import { config } from "../functions/connect.js";
import Area from "./Area.model.js";

const Agency = config.define('Agency', {
  idAgency: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  idArea: DataTypes.INTEGER,
  name: DataTypes.STRING,
  state: DataTypes.ENUM('Activo', 'Inactivo'),
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  tableName: 'Agency',
  freezeTableName: true,
  timestamps: true
});

Agency.belongsTo(Area, {foreignKey: 'idArea'});
Area.hasMany(Agency, { foreignKey: 'idArea' });

export default Agency;
