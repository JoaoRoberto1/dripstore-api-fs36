import authConfig from '../config/authConfig.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Usuario } from '../../models/usuario.model.js';
import { Papel } from '../../models/papel.model.js';

export const loginService = {
    
    cadastrar: async (req, res) => {
        const { nome, cpf, email, senha} = req.body;
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

            res.status(201).json({message: 'Usuário cadastrado com sucesso!'});
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Erro ao cadastrar usuário' });
        }
    }

}