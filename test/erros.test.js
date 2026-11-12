const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { iniciar } = require('./helper');

let api;
before(async () => { api = await iniciar(); });
after(() => api.fechar());

test('rota inexistente retorna 404 em JSON', async () => {
  const resposta = await fetch(`${api.url}/nao-existe`);
  assert.equal(resposta.status, 404);
  assert.deepEqual(await resposta.json(), { erro: 'Rota não encontrada' });
});

test('JSON malformado retorna 400 em JSON', async () => {
  const resposta = await fetch(`${api.url}/tarefas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{invalido',
  });
  assert.equal(resposta.status, 400);
  assert.deepEqual(await resposta.json(), { erro: 'JSON inválido' });
});
