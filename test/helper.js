const app = require('../src/app');
const repositorio = require('../src/repositorio/tarefaRepositorio');

async function iniciar() {
  repositorio.limpar();
  const server = await new Promise((resolve) => {
    const s = app.listen(0, () => resolve(s));
  });
  return {
    url: `http://localhost:${server.address().port}`,
    fechar: () =>
      new Promise((resolve) => {
        server.close(resolve);
        server.closeAllConnections?.();
      }),
  };
}

module.exports = { iniciar };
