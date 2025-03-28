import Categoria from "../models/categoria.model.js";

const categoriaService = {
  // Método para buscar todas as categorias
  async getAll(req, res) {
    try {
      const categorias = await Categoria.findAll();
      res.status(200).json(categorias);
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: `Erro ao buscar categorias: ${error}` });
    }
  },

  // Método para buscar uma categoria por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const categoria = await Categoria.findByPk(id);
      if (!categoria) {
        return res.status(404).json({ mensagem: 'Categoria não encontrada' });
      }
      res.status(200).json(categoria);
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: 'Erro ao buscar categoria' });
    }
  },

  // Método para criar uma nova categoria
  async create(req, res) {
    try {
      const { nome, codigo, descricao } = req.body;
      const novaCategoria = await Categoria.create({ nome, codigo, descricao });
      res.status(201).json(novaCategoria);
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: 'Erro ao criar categoria' });
    }
  },

  // Método para atualizar uma categoria
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome } = req.body;

      const categoria = await Categoria.findByPk(id);
      if (!categoria) {
        return res.status(404).json({ mensagem: 'Categoria não encontrada' });
      }

      await categoria.update({ nome });
      res.status(200).json(categoria);
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: 'Erro ao atualizar categoria' });
    }
  },

  // Método para deletar uma categoria
  async delete(req, res) {
    try {
      const { id } = req.params;
      const categoria = await Categoria.findByPk(id);

      if (!categoria) {
        return res.status(404).json({ mensagem: 'Categoria não encontrada' });
      }

      await categoria.destroy();
      res.status(204).send();
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: 'Erro ao excluir categoria' });
    }
  },

  // Método para inserir categorias iniciais
  async insertCategories() {
    try {
      const categories = [
        { codigo: 1, nome: 'Eletrônicos', descricao: 'Produtos eletrônicos' },
        { codigo: 2, nome: 'Eletrodomésticos', descricao: 'Produtos eletrodomésticos' },
        { codigo: 3, nome: 'Informática', descricao: 'Produtos de informática' },
        { codigo: 4, nome: 'Móveis', descricao: 'Produtos de móveis' },
        { codigo: 5, nome: 'Decoração', descricao: 'Produtos de decoração' }
      ];

      // Inserindo as categorias no banco de dados
      for (const category of categories) {
        await Categoria.create(category);
      }

      console.log('Categorias inseridas com sucesso!');
    } catch (error) {
      console.error('[ERRO]:', error);
    }
  }
};

export default categoriaService;
