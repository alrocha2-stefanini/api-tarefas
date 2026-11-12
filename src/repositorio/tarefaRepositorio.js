let tarefas = [];
let proximoId = 1;

function listar() {
  return tarefas;
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

function limpar() {
  tarefas = [];
  proximoId = 1;
}

module.exports = { listar, criar, limpar };
