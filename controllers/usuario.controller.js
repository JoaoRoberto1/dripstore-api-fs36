import express from 'express';
import usuarioService from '../services/usuario.service.js'; // Adjust the import path as needed
const router = express.Router();

export const usuarioController = (app) => {
    router.get('/usuarios', usuarioService.getAll)       // Buscar todos os usuários
        .get('/usuarios/:id', usuarioService.getById)    // Buscar um usuário por ID
        .post('/usuarios', usuarioService.create)        // Criar um usuário
        .put('/usuarios/:id', usuarioService.update)     // Atualizar um usuário
        .delete('/usuarios/:id', usuarioService.delete); // Excluir um usuário

    // Prefixo global "/api/usuarios" para todas as rotas de usuários
    app.use('/api', router);
}

export default router;
