import {DataTypes} from "sequelize";
import { config } from "../functions/connect.js";

import Question from "./Question.model.js";

const Quiz = config.define('Quiz', {
  idQuiz: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  image: DataTypes.STRING,
  durationTime: DataTypes.INTEGER,
  attempts: DataTypes.INTEGER,
  order: DataTypes.INTEGER,
  state: DataTypes.ENUM('Activo', 'Inactivo'),
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  tableName: 'Quiz',
  freezeTableName: true,
  timestamps: true
});

Question.belongsTo(Quiz, { foreignKey: 'idQuiz' });
Quiz.hasMany(Question, { foreignKey: 'idQuiz' })


export default Quiz;
