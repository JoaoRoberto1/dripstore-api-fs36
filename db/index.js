import { Sequelize } from 'sequelize';
import config from './config.js';

/* const variaveis = process.env;
console.log('variaveis'); */

const sequelize = new Sequelize(`postgresql://${config.username}:${config.password}@${config.host}/${config.database}?sslmode=require`) // Example for postgres

// Função assíncrona para conectar ao banco
const conectarBanco = async () => {
    try {
      await sequelize.authenticate();
      console.log('[OK] Conexão com o Banco de Dados estabelecida com sucesso');
    } catch (error) {
      console.error('[ERRO]: Não foi possível conectar ao banco de dados:', error);
    }
  };
  


  conectarBanco();

  export default sequelize;

  