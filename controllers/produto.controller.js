import express from 'express';
import produtoService from '../services/produto.service.js';

const router = express.Router();

export const produtoController = app => {

    router.get('/produtos', produtoService.getAll)       // Buscar todos os produtos
        .get('/produtos/:id', produtoService.getById) // Buscar um produto por ID
        .post('/produtos', produtoService.create)     // Criar um produto
        .put('/produtos/:id', produtoService.update)  // Atualizar um produto
        .delete('/produtos/:id', produtoService.delete); // Excluir um produto

    // Prefixo global "/api/produtos" para todas as rotas de produtos
    app.use('/api', router);
}

export default router;
