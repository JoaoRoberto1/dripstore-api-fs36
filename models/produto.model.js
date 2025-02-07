import { Sequelize } from 'sequelize';
//import Categoria from './categoria.model.js';
import sequelize from '../db/index.js';

const Produto = sequelize.define('Produto', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: false
  },
  avaliacao: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  tamanho: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  cor: {
    type: Sequelize.STRING,
    allowNull: false
  },
  preco: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  /* categoriaId: {
    type: Sequelize.INTEGER,
    references: {
      model: Categoria, // Relacionamento com a tabela Categoria
      key: 'id'
    }
  } */
}, {
  tableName: 'produto',
  //timestamps: false
});

// Definir o relacionamento
/* Produto.belongsTo(Categoria, { foreignKey: 'categoriaId' });
Categoria.hasMany(Produto, { foreignKey: 'categoriaId' }); */

export default Produto;
