const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { iniciar } = require('./helper');

let api;
before(async () => { api = await iniciar(); });
after(() => api.fechar());

test('GET /saude retorna status ok', async () => {
  const resposta = await fetch(`${api.url}/saude`);
  assert.equal(resposta.status, 200);
  assert.deepEqual(await resposta.json(), { status: 'ok' });
});
