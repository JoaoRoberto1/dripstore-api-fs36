import express from 'express';
import sequelize from './db/index.js';

const app = express();
app.use(express.json());

const HOST = '127.0.0.1';
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Olá Mundo!')
})

app.listen(PORT, HOST, () => {
    console.log(`App de exemplo está rodando em http://${HOST}:${PORT}`);
  });