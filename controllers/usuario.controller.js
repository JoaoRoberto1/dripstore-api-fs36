import express from 'express';
import usuarioService from '../services/usuario.service.js'; // Adjust the import path as needed
const router = express.Router();

export const usuarioController = (app) => {
    try {
        if (!usuarioService) {
            throw new Error('usuarioService não está definido.');
        }

        router.get('/usuarios', usuarioService.getAll || ((req, res) => res.status(501).send('Não implementado')))
            .get('/usuarios/:id', usuarioService.getById || ((req, res) => res.status(501).send('Não implementado')))
            .post('/usuarios', usuarioService.create || ((req, res) => res.status(501).send('Não implementado')))
            .put('/usuarios/:id', usuarioService.update || ((req, res) => res.status(501).send('Não implementado')))
            .delete('/usuarios/:id', usuarioService.delete || ((req, res) => res.status(501).send('Não implementado')));

        // Prefixo global "/api/usuarios" para todas as rotas de usuários
        app.use('/api/usuarios', router);

        // Middleware para capturar erros
        app.use((err, req, res, next) => {
            console.error('Erro no servidor:', err);
            res.status(500).send('Erro interno do servidor.');
        });
    } catch (error) {
        console.error('Erro ao configurar as rotas de usuário:', error);
    }
};

export default usuarioController;
