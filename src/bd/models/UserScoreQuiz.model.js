import { DataTypes } from "sequelize";
import { config } from "../functions/connect.js";

import UserQuiz from "./UserQuiz.model.js";

const UserScoreQuiz = config.define('UserScoreQuiz', {
  idUserScore: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  idUserQuiz: DataTypes.INTEGER,
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
UserScoreQuiz.belongsTo(UserQuiz, { foreignKey: 'idUserQuiz' });
UserQuiz.hasOne(UserScoreQuiz, {foreignKey: "idUserQuiz"});

export default UserScoreQuiz;
