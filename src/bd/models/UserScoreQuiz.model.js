import { DataTypes } from "sequelize";
import { config } from "../functions/connect.js";

import Quiz from "./Quiz.model.js";

const UserScoreQuiz = config.define('UserScoreQuiz', {
  idUserScore: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  idQuiz: DataTypes.INTEGER,
  idUser: DataTypes.INTEGER,
  quizTime: DataTypes.STRING,
  score: DataTypes.INTEGER,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  tableName: 'UserScoreQuiz',
  freezeTableName: true,
  timestamps: true
});

// Relaciones
UserScoreQuiz.belongsTo(Quiz, { foreignKey: 'idQuiz' });
Quiz.hasMany(UserScoreQuiz, {foreignKey: "idQuiz"});

export default UserScoreQuiz;
