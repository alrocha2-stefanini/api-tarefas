const express = require('express');
const rotasTarefas = require('./rotas/tarefas');

const app = express();

app.use(express.json());

app.get('/saude', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/tarefas', rotasTarefas);

module.exports = app;
