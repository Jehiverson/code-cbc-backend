import {DataTypes} from "sequelize";
import { config } from "../functions/connect.js";

import Presentation from "./Presentation.model.js";

const PresentationItem = config.define('PresentationItem', {
  idPresentationItem: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  Position: DataTypes.INTEGER,
  idUrl: DataTypes.STRING,
  state: DataTypes.ENUM('Activo', 'Inactivo'),
  idTypePresentation: DataTypes.ENUM('video', 'image'),
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  tableName: 'PresentationItem',
  freezeTableName: true,
  timestamps: true
});

// Suponiendo que PresentationItem pertenece a Presentation
PresentationItem.belongsTo(Presentation, { foreignKey: 'idPresentation' });

export default PresentationItem;
