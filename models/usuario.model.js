import { Sequelize } from "sequelize";
import sequelize from "../db/index.js";

// Definir o modelo Papel
const Papel = sequelize.define(
  "Papel",
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
      unique: {
        msg: "O nome do papel deve ser único.",
      },
    },
  },
  {
    tableName: "papeis",
    timestamps: false,
  }
);

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
        msg: "O email informado já está em uso.",
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
        msg: "O CPF informado já está em uso.",
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

// Definir relacionamento N para N com Papel
Usuario.belongsToMany(Papel, { through: "usuario_papel", as: "papeis" });
Papel.belongsToMany(Usuario, { through: "usuario_papel", as: "usuarios" });

export default Usuario;
export { Papel };
