import { Sequelize } from "sequelize";
import sequelize from "../db/index.js";
import Categoria from "./categoria.model.js"; // Importando a Categoria

const Produto = sequelize.define(
  "Produto",
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
    descricao: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    avaliacao: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    tamanho: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    cor: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    preco: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    categoriaId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Categoria, // Relacionamento com Categoria
        key: "id",
      },
    },
  },
  {
    tableName: "produto",
  }
);

// Definir o relacionamento 1 para N
Produto.belongsTo(Categoria, { foreignKey: "categoriaId" });
Categoria.hasMany(Produto, { foreignKey: "categoriaId" });

export default Produto;
