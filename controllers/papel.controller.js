import express from 'express';
import papelervice from '../services/usuario.service.js'; // Adjust the import path as needed
const router = express.Router();

export const usuarioController = (app) => {
    router.get('/papel', papelervice.getAll)       // Buscar todos os usuários
        .get('/papel/:id', papelervice.getById)    // Buscar um usuário por ID
        .post('/papel', papelervice.create)        // Criar um usuário
        .put('/papel/:id', papelervice.update)     // Atualizar um usuário
        .delete('/papel/:id', papelervice.delete); // Excluir um usuário

    // Prefixo global "/api/papel" para todas as rotas de usuários
    app.use('/api/papel', router);
}

export default router;
