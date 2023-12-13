import { DataTypes } from "sequelize";
import { config } from "../functions/connect.js";

const Question = config.define('Question', {
  idQuestion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  idQuiz: DataTypes.INTEGER,
  description: DataTypes.STRING,
  noQuestion: DataTypes.INTEGER,
  state: DataTypes.ENUM('Activo', 'Inactivo'),
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  tableName: 'Question',
  freezeTableName: true,
  timestamps: true
});

export default Question;
