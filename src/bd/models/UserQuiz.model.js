import {DataTypes} from "sequelize";
import { config } from "../functions/connect.js";

import User from "./User.model.js";
import Quiz from "./Quiz.model.js";

const UserQuiz = config.define('UserQuiz', {
  idUserQuiz: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  idUser: DataTypes.INTEGER,
  idQuiz: DataTypes.INTEGER,
  attempts: DataTypes.INTEGER,
  aproved: DataTypes.INTEGER,
  state: DataTypes.ENUM('Activo', 'Inactivo'),
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  tableName: 'UserQuiz',
  freezeTableName: true,
  timestamps: true
});

// Suponiendo que UserQuiz pertenece a User y a Quiz
UserQuiz.belongsTo(User, { foreignKey: 'idUser'});
User.hasMany(UserQuiz, {foreignKey: 'idUser', as: 'UserQuiz'});

UserQuiz.belongsTo(Quiz, { foreignKey: 'idQuiz' });

export default UserQuiz;
