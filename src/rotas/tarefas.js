const router = require('express').Router();
const repositorio = require('../repositorio/tarefaRepositorio');
const validarTarefa = require('../middlewares/validarTarefa');

router.get('/', (req, res) => {
  res.json(repositorio.listar());
});

router.post('/', validarTarefa, (req, res) => {
  res.status(201).json(repositorio.criar(req.body));
});

module.exports = router;
