import express from 'express';
import sequelize from './db/index.js';
import { iniciarBanco } from './db/sync.js';
import { produtoController } from './controllers/produto.controller.js';
import cors from 'cors';
import { categoriaController } from './controllers/categoria.controller.js';

const app = express();
app.use(express.json());
app.use(cors())

const HOST = '127.0.0.1';
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Olá Mundo!')
})

iniciarBanco();

produtoController(app)
categoriaController(app)

app.listen(PORT, HOST, () => {
    console.log(`App de exemplo está rodando em http://${HOST}:${PORT}`);
  });