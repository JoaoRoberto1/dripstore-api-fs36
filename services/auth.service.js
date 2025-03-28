import Usuario from "../models/usuario.model.js";
import jwt from 'jsonwebtoken';

const authService = {
  async cadastrar(req, res) {
    try {
      const { nome, email, senha } = req.body;
      const hashedSenha = await bcrypt.hash(senha, 10);
      const novoUsuario = await Usuario.create({ nome, email, senha: hashedSenha });
      res.status(201).json(novoUsuario);
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: 'Erro ao cadastrar usuário' });
    }
  },

  async login(req, res) {
    try {
      const { email, senha } = req.body;
      const usuario = await Usuario.findOne({ where: { email } });

      if (!usuario || !await bcrypt.compare(senha, usuario.senha)) {
        return res.status(401).json({ mensagem: 'Credenciais inválidas' });
      }

      const token = jwt.sign({ id: usuario.id }, 'seu_segredo', { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: 'Erro ao fazer login' });
    }
  }
};

export default authService;
