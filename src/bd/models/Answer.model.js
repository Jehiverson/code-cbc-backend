import {DataTypes} from "sequelize";
import { config } from "../functions/connect.js";

const Answer = config.define('Answer', {
  idAnswers: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  description: DataTypes.TEXT,
  isCorrect: DataTypes.BOOLEAN,
  state: DataTypes.ENUM('Activo', 'Inactivo'),
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  tableName: 'Answer',
  freezeTableName: true,
  timestamps: true
});

export default Answer;
