import express from 'express';
import authService from '../services/auth.service.js';
const router = express.Router();

export const authController = (app) => {
    router.post('/cadastrar', authService.cadastrar) // Endpoint para cadastro
        .post('/login', authService.login); // Endpoint para login

    app.use('/auth', router);
}

export default router;

