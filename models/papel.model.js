import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";
import Usuario from "./usuario.model.js"; // Import Usuario model

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
      validate: {
        notEmpty: { msg: "O nome não pode estar vazio" },
      },
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "Este código já está em uso" },
      validate: {
        notEmpty: { msg: "O código não pode estar vazio" },
      },
    },
  },
  {
    tableName: "papel",
    timestamps: true,
  }
);

// Definir relacionamento N para N com Usuario
Papel.belongsToMany(Usuario, { through: "usuario_papel", as: "usuarios" });

export default Papel;
