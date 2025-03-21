import Usuario from "../models/usuario.model.js";

const usuarioService = {
  async getAll(req, res) {
    try {
      const usuarios = await Usuario.findAll();
      res.status(200).json(usuarios);
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: `Erro ao buscar usuários: ${error}` });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
      }
      res.status(200).json(usuario);
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: 'Erro ao buscar usuário' });
    }
  },

  async create(req, res) {
    try {
      const { nome, email, senha } = req.body;
      const novoUsuario = await Usuario.create({ nome, email, senha });
      res.status(201).json(novoUsuario);
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: 'Erro ao criar usuário' });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, senha } = req.body;

      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
      }

      await usuario.update({ nome, email, senha });
      res.status(200).json(usuario);
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: 'Erro ao atualizar usuário' });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
      }

      await usuario.destroy();
      res.status(204).send();
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: 'Erro ao excluir usuário' });
    }
  }
};

export default usuarioService;
