import Papel from "../models/papel.model.js";

const papelService = {
  // Método para buscar todos os papéis
  async getAll(req, res) {
    try {
      const papeis = await Papel.findAll();
      res.status(200).json(papeis);
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: `Erro ao buscar papéis: ${error}` });
    }
  },

  // Método para buscar um papel por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const papel = await Papel.findByPk(id);
      if (!papel) {
        return res.status(404).json({ mensagem: 'Papel não encontrado' });
      }
      res.status(200).json(papel);
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: 'Erro ao buscar papel' });
    }
  },

  // Método para criar um novo papel
  async create(req, res) {
    try {
      const { nome, codigo } = req.body;

      // Verificar se já existe um papel com o mesmo código
      const existingPapel = await Papel.findOne({ where: { codigo } });
      if (existingPapel) {
        return res.status(400).json({ mensagem: 'Este código de papel já está em uso' });
      }

      const novoPapel = await Papel.create({ nome, codigo });
      res.status(201).json(novoPapel);
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: 'Erro ao criar papel' });
    }
  },

  // Método para atualizar um papel
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, codigo } = req.body;

      const papel = await Papel.findByPk(id);
      if (!papel) {
        return res.status(404).json({ mensagem: 'Papel não encontrado' });
      }

      // Verificar se o código do papel foi alterado e já existe outro papel com o novo código
      if (codigo !== papel.codigo) {
        const existingPapel = await Papel.findOne({ where: { codigo } });
        if (existingPapel) {
          return res.status(400).json({ mensagem: 'Este código de papel já está em uso' });
        }
      }

      await papel.update({ nome, codigo });
      res.status(200).json(papel);
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: 'Erro ao atualizar papel' });
    }
  },

  // Método para deletar um papel
  async delete(req, res) {
    try {
      const { id } = req.params;
      const papel = await Papel.findByPk(id);

      if (!papel) {
        return res.status(404).json({ mensagem: 'Papel não encontrado' });
      }

      await papel.destroy();
      res.status(204).send();
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: 'Erro ao excluir papel' });
    }
  }
};

export default papelService;
