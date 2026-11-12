const express = require('express');
const rotasTarefas = require('./rotas/tarefas');
const { naoEncontrado, tratadorDeErros } = require('./middlewares/erros');

const app = express();

app.use(express.json());

app.get('/saude', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/tarefas', rotasTarefas);

app.use(naoEncontrado);
app.use(tratadorDeErros);

module.exports = app;
