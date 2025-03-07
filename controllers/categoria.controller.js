import express from 'express';
import categoriaService from '../services/categoria.service.js'; // Fix import path
const router = express.Router();

export const categoriaController = (app) => {
    router.get('/categorias', categoriaService.getAll)       // Buscar todos os categorias
        .get('/categorias/:id', categoriaService.getById)    // Buscar um categoria por ID
        .post('/categorias', categoriaService.create)        // Criar um categoria
        .put('/categorias/:id', categoriaService.update)     // Atualizar um categoria
        .delete('/categorias/:id', categoriaService.delete); // Excluir um categoria

    // Prefixo global "/api/categorias" para todas as rotas de categorias
    app.use('/api', router);
}

export default router;