import Categoria from "../models/categoria.model.js";
import Produto from "../models/produto.model.js";

const produtoService = {
  // Método para buscar todos os produtos
  async getAll(req, res) {
    try {
      const produtos = await Produto.findAll({
        include: {
          model: Categoria,
          as: 'categoria',
          attributes: ['id', 'nome'],
        },
      });
      res.status(200).json(produtos);
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: `Erro ao buscar produtos: ${error}` });
    }
  },

  // Método para buscar um produto por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const produto = await Produto.findByPk(id);
      if (!produto) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
      }
      res.status(200).json(produto);
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: 'Erro ao buscar produto' });
    }
  },

  // Método para criar um novo produto
  async create(req, res) {
    try {
      const { nome, descricao, avaliacao, tamanho, cor, preco, categoriaId } = req.body;

      const categoriaExiste = await Categoria.findByPk(categoriaId);
      if (!categoriaExiste) {
        return res.status(404).json({ mensagem: 'Categoria não encontrada'})
      }

      const novoProduto = await Produto.create({ nome, descricao, avaliacao, tamanho, cor, preco, categoriaId });
      res.status(201).json(novoProduto);
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: 'Erro ao criar produto' });
    }
  },

  // Método para atualizar um produto
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, preco, categoriaId } = req.body;

      const produto = await Produto.findByPk(id);
      if (!produto) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
      }

      await produto.update({ nome, preco, categoriaId });
      res.status(200).json(produto);
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: 'Erro ao atualizar produto' });
    }
  },

  // Método para deletar um produto
  async delete(req, res) {
    try {
      const { id } = req.params;
      const produto = await Produto.findByPk(id);

      if (!produto) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
      }

      await produto.destroy();
      res.status(204).send();
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: 'Erro ao excluir produto' });
    }
  }
};

export default produtoService;