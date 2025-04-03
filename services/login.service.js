import authConfig from '../config/authConfig.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Usuario } from '../../models/usuario.model.js';
import { Papel } from '../../models/papel.model.js';

export const loginService = {
    cadastrar: async (req, res) => {
        const { nome, cpf, email, senha } = req.body;
        try {
            // Create new user
            const senhaEncriptada = await bcrypt.hash(senha, 10);
            const usuario = await Usuario.create({
                nome: nome,
                cpf: cpf,
                email: email,
                senha: senhaEncriptada
            });

            const papel = await Papel.findOne({ where: { nome: 'Usuario' } });
            if (papel) {
                await usuario.addPapel(papel);
            }

            res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Erro ao cadastrar usuário' });
        }
    },

    login: async (req, res) => {
        const { email, senha } = req.body;
        try {
            const usuario = await Usuario.findOne({
                where: {
                    email,
                },
            });

            if (!usuario) {
                return res.status(401).json({ message: 'Usuário não encontrado' });
            }

            const senhaEhInvalida = !(await bcrypt.compare(senha, usuario.senha));
            if (senhaEhInvalida) {
                return res.status(401).json({
                    token: null,
                    message: 'Senha inválida',
                });
            }

            const token = jwt.sign({ id: usuario.id }, authConfig.secret, {
                expiresIn: 86400, // 24 hours
            });

            res.status(200).json({
                ...usuario.dataValues,
                token: token,
            });
        } catch (error) {
            console.error(`ERROR: ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    },
};