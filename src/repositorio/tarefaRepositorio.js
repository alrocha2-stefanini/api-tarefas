let tarefas = [];
let proximoId = 1;

function listar() {
  return tarefas;
}

function buscarPorId(id) {
  return tarefas.find((t) => t.id === id) || null;
}

function criar({ titulo, descricao = '' }) {
  const tarefa = {
    id: proximoId++,
    titulo: titulo.trim(),
    descricao,
    concluida: false,
    criadaEm: new Date().toISOString(),
  };
  tarefas.push(tarefa);
  return tarefa;
}

function atualizar(id, { titulo, descricao, concluida }) {
  const tarefa = buscarPorId(id);
  if (!tarefa) return null;
  tarefa.titulo = titulo.trim();
  tarefa.descricao = descricao ?? tarefa.descricao;
  tarefa.concluida = concluida ?? tarefa.concluida;
  return tarefa;
}

function remover(id) {
  const indice = tarefas.findIndex((t) => t.id === id);
  if (indice === -1) return false;
  tarefas.splice(indice, 1);
  return true;
}

function limpar() {
  tarefas = [];
  proximoId = 1;
}

module.exports = { listar, buscarPorId, criar, atualizar, remover, limpar };
