const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { iniciar } = require('./helper');

let api;
before(async () => { api = await iniciar(); });
after(() => api.fechar());

const json = (corpo) => ({
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(corpo),
});

test('GET /tarefas começa vazio', async () => {
  const resposta = await fetch(`${api.url}/tarefas`);
  assert.equal(resposta.status, 200);
  assert.deepEqual(await resposta.json(), []);
});

test('POST /tarefas cria uma tarefa', async () => {
  const resposta = await fetch(`${api.url}/tarefas`, json({ titulo: 'Estudar Git' }));
  assert.equal(resposta.status, 201);
  const tarefa = await resposta.json();
  assert.equal(tarefa.id, 1);
  assert.equal(tarefa.titulo, 'Estudar Git');
  assert.equal(tarefa.concluida, false);
});

test('POST /tarefas sem título retorna 400', async () => {
  const resposta = await fetch(`${api.url}/tarefas`, json({ descricao: 'sem título' }));
  assert.equal(resposta.status, 400);
  const corpo = await resposta.json();
  assert.ok(Array.isArray(corpo.erros));
});

test('GET /tarefas lista a tarefa criada', async () => {
  const resposta = await fetch(`${api.url}/tarefas`);
  const tarefas = await resposta.json();
  assert.equal(tarefas.length, 1);
});
