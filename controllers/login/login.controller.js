import express from 'express';
import { loginService } from '../../services/login.service.js';

const router = express.Router();

export const loginController = (app) => {
    router
       .post('/cadastrar', loginService.cadastrar)
       .post('/login', loginService.login);

       app.use("/api/auth", router)
};

export default router;