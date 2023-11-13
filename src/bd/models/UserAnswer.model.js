import {DataTypes} from "sequelize";
import { config } from "../functions/connect.js";

import User from "./User.model.js";
import Answer from "./Answer.model.js";
import Question from "./Question.model.js";

const UserAnswer = config.define('UserAnswer', {
  UserAnswer: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  idUser: DataTypes.INTEGER,
  idQuestion: DataTypes.INTEGER,
  idAnswer: DataTypes.INTEGER,
  state: DataTypes.ENUM('Activo', 'Inactivo'),
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  tableName: 'UserAnswer',
  freezeTableName: true,
  timestamps: true
});

// Relaciones
UserAnswer.belongsTo(User, { foreignKey: 'idUser' });
UserAnswer.belongsTo(Question, { foreignKey: 'idQuestion' });
UserAnswer.belongsTo(Answer, { foreignKey: 'idAnswer' });

export default UserAnswer;
