import { Sequelize, DataTypes } from "sequelize"; // Corrigido para importar o Sequelize e DataTypes
import sequelize from "../db/index.js";  // Mantenha a importação do sequelize

const Papel = sequelize.define(
  "Papel",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "papel",
    timestamps: true,
  }
);

export default Papel;
