const router = require('express').Router();
const repositorio = require('../repositorio/tarefaRepositorio');
const validarTarefa = require('../middlewares/validarTarefa');

router.get('/', (req, res) => {
  const { concluida } = req.query;
  if (concluida === undefined) {
    return res.json(repositorio.listar());
  }
  if (concluida !== 'true' && concluida !== 'false') {
    return res.status(400).json({ erro: "concluida deve ser 'true' ou 'false'" });
  }
  res.json(repositorio.listar({ concluida: concluida === 'true' }));
});

router.post('/', validarTarefa, (req, res) => {
  res.status(201).json(repositorio.criar(req.body));
});

router.get('/:id', (req, res) => {
  const tarefa = repositorio.buscarPorId(Number(req.params.id));
  if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });
  res.json(tarefa);
});

router.put('/:id', validarTarefa, (req, res) => {
  const tarefa = repositorio.atualizar(Number(req.params.id), req.body);
  if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });
  res.json(tarefa);
});

router.delete('/:id', (req, res) => {
  const removida = repositorio.remover(Number(req.params.id));
  if (!removida) return res.status(404).json({ erro: 'Tarefa não encontrada' });
  res.status(204).send();
});

module.exports = router;
