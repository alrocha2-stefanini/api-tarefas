const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { iniciar } = require('./helper');

let api;

before(async () => {
  api = await iniciar();

  const enviar = (corpo) =>
    fetch(`${api.url}/tarefas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(corpo),
    });

  await enviar({ titulo: 'Pendente' });
  await enviar({ titulo: 'Feita' });

  await fetch(`${api.url}/tarefas/2`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo: 'Feita', concluida: true }),
  });
});

after(() => api.fechar());

test('GET /tarefas sem filtro lista todas', async () => {
  const tarefas = await (await fetch(`${api.url}/tarefas`)).json();
  assert.equal(tarefas.length, 2);
});

test('GET /tarefas?concluida=true lista só as concluídas', async () => {
  const tarefas = await (await fetch(`${api.url}/tarefas?concluida=true`)).json();
  assert.equal(tarefas.length, 1);
  assert.equal(tarefas[0].titulo, 'Feita');
});

test('GET /tarefas?concluida=false lista só as pendentes', async () => {
  const tarefas = await (await fetch(`${api.url}/tarefas?concluida=false`)).json();
  assert.equal(tarefas.length, 1);
  assert.equal(tarefas[0].titulo, 'Pendente');
});

test('GET /tarefas?concluida=abc retorna 400', async () => {
  const resposta = await fetch(`${api.url}/tarefas?concluida=abc`);
  assert.equal(resposta.status, 400);
});