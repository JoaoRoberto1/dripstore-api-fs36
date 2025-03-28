import { Sequelize } from "sequelize";
import sequelize from "../db/index.js";
import Papel from "./papel.model.js";  // Adicionando a importação do modelo Papel

const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        msg: "O email informado já está em uso."
      },
    },
    senha: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cpf: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        msg: "O CPF informado já está em uso." 
      },
      validate: {
        notEmpty: { msg: "O CPF não pode estar vazio." },
        is: { args: [/^\d{11}$/], msg: "O CPF deve conter apenas números e ter 11 dígitos." },
      },
    },
  },
  {
    tableName: "usuarios",
    timestamps: false,
  }
);

// Definindo o relacionamento muitos-para-muitos com Papel
Usuario.belongsToMany(Papel, { through: "usuario_papel", as: "papel" });

export default Usuario;
