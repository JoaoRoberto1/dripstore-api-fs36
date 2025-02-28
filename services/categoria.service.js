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
      const { nome } = req.body;
      const novaCategoria = await Categoria.create({ nome });
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
  }
};

export default categoriaService;
