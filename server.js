import express from 'express';
import sequelize from './db/index.js';
import { iniciarBanco } from './db/sync.js';
import { produtoController } from './controllers/produto.controller.js';
import { categoriaController } from './controllers/categoria.controller.js';
import { usuarioController } from './controllers/usuario.controller.js'; // Adicionado
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const HOST = '127.0.0.1';
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Olá Mundo!');
});

iniciarBanco();

produtoController(app);
categoriaController(app);
usuarioController(app); // Adicionado

app.listen(PORT, HOST, () => {
    console.log(`App de exemplo está rodando em http://${HOST}:${PORT}`);
});