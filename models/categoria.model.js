import { Sequelize } from "sequelize";
import sequelize from "../db/index.js";

const Categoria = sequelize.define(
  "Categoria",
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
  },
  {
    tableName: "categorias", // Nome da tabela no banco
    timestamps: false, // Desabilita createdAt e updatedAt
  }
);

// Usando addHook para garantir que Produto seja importado e os relacionamentos sejam definidos após Categoria
Categoria.addHook('afterDefine', async () => {
  const Produto = await import("./produto.model.js"); // Importação dinâmica de Produto

  // Definindo o relacionamento 1 para N
  Produto.default.belongsTo(Categoria, { foreignKey: "categoriaId" }); // Produto pertence a uma Categoria
  Categoria.hasMany(Produto.default, { foreignKey: "categoriaId" }); // Categoria tem muitos Produtos
});

export default Categoria;
