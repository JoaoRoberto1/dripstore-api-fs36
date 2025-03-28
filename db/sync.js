import sequelize from "./index.js";
import Papel from "../models/papel.model.js"; // Supondo que o modelo Papel já exista
import Categoria from "../models/categoria.model.js"; // Supondo que o modelo Categoria já exista
import  insertCategories  from '../services/categoria.service.js'; // Supondo que insertCategories esteja em categoriaService.js


export const iniciarBanco = async () => {
  try {
    await sequelize.sync({ force: true, alter: true }); // ⚠️ Isso apaga e recria as tabelas! Use `alter: true` para atualizar sem perder dados
    console.log('✅ Banco de dados sincronizado!');
  } catch (error) {
    console.error('❌ Erro ao sincronizar banco:', error);
  }
};

export const insertPapeis = async () => {
  try {
    const papeis = [
      { codigo: 'USUARIO', nome: 'Usuário' },
      { codigo: 'ADMIN', nome: 'Administrador' },
      { codigo: 'MODERADOR', nome: 'Moderador' },
    ];

    for (let papel of papeis) {
      const existePapel = await Papel.findOne({ where: { codigo: papel.codigo } });
      if (!existePapel) {
        await Papel.create(papel);
        console.log(`Papel '${papel.nome}' inserido com sucesso.`);
      } else {
        console.log(`Papel '${papel.nome}' já existe. Ignorando inserção.`);
      }
    }

    const categoriaCount = await Categoria.count();
    if (categoriaCount === 0) {
      console.log('Banco vazio, inserindo categorias...');
      await insertCategories();  // Insere as categorias caso não haja nenhuma
    } else {
      console.log('Banco já contém dados, não é necessário inserir categorias.');
    }
    
  } catch (error) {
    console.error('Erro ao inserir papéis:', error);
  }
};

// Chama a função de iniciar o banco e de inserir os papéis
iniciarBanco();
insertPapeis();
