import { DataTypes } from "sequelize";
import { config } from "../functions/connect.js";
import Quiz from "./Quiz.model.js";

const Presentation = config.define('Presentation', {
  idPresentation: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  idQuiz: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: DataTypes.STRING,
  state: DataTypes.ENUM('Activo', 'Inactivo'),
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  tableName: 'Presentation',
  freezeTableName: true,
  timestamps: true
});

Presentation.belongsTo(Quiz, { foreignKey: 'idQuiz' });
Quiz.hasMany(Presentation, { foreignKey: 'idQuiz' })

export default Presentation;
