import {DataTypes} from "sequelize";
import { config } from "../functions/connect.js";

import Quiz from "./Quiz.model.js";

const Question = config.define('Question', {
  idQuestion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  idQuiz: DataTypes.INTEGER,
  description: DataTypes.TEXT,
  state: DataTypes.ENUM('Activo', 'Inactivo'),
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  tableName: 'Question',
  freezeTableName: true,
  timestamps: true
});

// Suponiendo que Question pertenece a Quiz
Question.belongsTo(Quiz, { foreignKey: 'idQuiz' });

export default Question;
