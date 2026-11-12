const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { iniciar } = require('./helper');

let api;
before(async () => { api = await iniciar(); });
after(() => api.fechar());

const enviar = (metodo, corpo) => ({
  method: metodo,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(corpo),
});

test('GET /tarefas/:id busca tarefa existente', async () => {
  await fetch(`${api.url}/tarefas`, enviar('POST', { titulo: 'Tarefa 1' }));
  const resposta = await fetch(`${api.url}/tarefas/1`);
  assert.equal(resposta.status, 200);
  assert.equal((await resposta.json()).titulo, 'Tarefa 1');
});

test('GET /tarefas/:id inexistente retorna 404', async () => {
  const resposta = await fetch(`${api.url}/tarefas/999`);
  assert.equal(resposta.status, 404);
});

test('PUT /tarefas/:id atualiza a tarefa', async () => {
  const resposta = await fetch(
    `${api.url}/tarefas/1`,
    enviar('PUT', { titulo: 'Tarefa 1 editada', concluida: true })
  );
  assert.equal(resposta.status, 200);
  const tarefa = await resposta.json();
  assert.equal(tarefa.titulo, 'Tarefa 1 editada');
  assert.equal(tarefa.concluida, true);
});

test('PUT /tarefas/:id inexistente retorna 404', async () => {
  const resposta = await fetch(`${api.url}/tarefas/999`, enviar('PUT', { titulo: 'x' }));
  assert.equal(resposta.status, 404);
});

test('DELETE /tarefas/:id remove a tarefa', async () => {
  const resposta = await fetch(`${api.url}/tarefas/1`, { method: 'DELETE' });
  assert.equal(resposta.status, 204);
  const busca = await fetch(`${api.url}/tarefas/1`);
  assert.equal(busca.status, 404);
});

test('DELETE /tarefas/:id inexistente retorna 404', async () => {
  const resposta = await fetch(`${api.url}/tarefas/999`, { method: 'DELETE' });
  assert.equal(resposta.status, 404);
});
