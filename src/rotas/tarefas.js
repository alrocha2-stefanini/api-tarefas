const router = require('express').Router();
const repositorio = require('../repositorio/tarefaRepositorio');
const validarTarefa = require('../middlewares/validarTarefa');

router.get('/', (req, res) => {
  res.json(repositorio.listar());
});

router.post('/', validarTarefa, (req, res) => {
  res.status(201).json(repositorio.criar(req.body));
});

router.get('/:id', (req, res) => {
  const tarefa = repositorio.buscarPorId(Number(req.params.id));
  if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });
  res.json(tarefa);
});

module.exports = router;
