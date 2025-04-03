import express from 'express';
import papelService from '../services/papel.service.js'; // Fix import path
const router = express.Router();

export const papelController = (app) => {
    router.get('/', papelService.getAll)               // Buscar todos os papéis
        .get('/:id', papelService.getById)             // Buscar um papel por ID
        .post('/', papelService.create)                // Criar um papel
        .put('/:id', papelService.update)              // Atualizar um papel
        .delete('/:id', papelService.delete);          // Excluir um papel

    // Prefixo global "/api/papeis" para todas as rotas de papéis
    app.use('/api/papeis', router);
}

export default router;
