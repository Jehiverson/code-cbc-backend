import { DataTypes } from "sequelize";
import { config } from "../functions/connect.js";
import Question from "./Question.model.js";

const Answer = config.define('Answer', {
  idAnswers: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  idQuestion: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  isCorrect: DataTypes.BOOLEAN,
  value: DataTypes.FLOAT,
  type: DataTypes.STRING,
  state: DataTypes.ENUM('Activo', 'Inactivo'),
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  tableName: 'Answer',
  freezeTableName: true,
  timestamps: true
});

Answer.belongsTo(Question, { foreignKey: 'idQuestion' });
Question.hasMany(Answer, { foreignKey: 'idQuestion' })

export default Answer;
