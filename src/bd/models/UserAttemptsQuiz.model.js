import {DataTypes} from "sequelize";
import { config } from "../functions/connect.js";

import User from "./User.model.js";
import Quiz from "./Quiz.model.js";

const UserAttemptsQuiz = config.define('UserAttemptsQuiz', {
  idUserAttemptsQuiz: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  idUser: DataTypes.INTEGER,
  idQuiz: DataTypes.INTEGER,
  attempts: DataTypes.INTEGER,
  state: DataTypes.ENUM('Activo', 'Inactivo'),
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  tableName: 'UserAttemptsQuiz',
  freezeTableName: true,
  timestamps: true
});

// Relaciones
UserAttemptsQuiz.belongsTo(User, { foreignKey: 'idUser' });
UserAttemptsQuiz.belongsTo(Quiz, { foreignKey: 'idQuiz' });

export default UserAttemptsQuiz;
