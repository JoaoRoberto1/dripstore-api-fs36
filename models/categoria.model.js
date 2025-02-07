import { Sequelize } from 'sequelize';
import sequelize from '../db/index.js';

const Categoria = sequelize.define('Categoria', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  tableName: 'categorias', // Nome da tabela no banco
  timestamps: false // Define se quer usar createdAt e updatedAt
});

export default Categoria;
