import sequelize from "./index.js";

export const iniciarBanco = async () => {
    try {
      await sequelize.sync({ force: true, alter: true }); // ⚠️ Isso apaga e recria as tabelas! Use `alter: true` para atualizar sem perder dados
      console.log('✅ Banco de dados sincronizado!');
    } catch (error) {
      console.error('❌ Erro ao sincronizar banco:', error);
    }
  };
  
  //iniciarBanco();