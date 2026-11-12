function validarTarefa(req, res, next) {
  const { titulo, descricao, concluida } = req.body || {};
  const erros = [];

  if (typeof titulo !== 'string' || titulo.trim() === '') {
    erros.push('titulo é obrigatório e deve ser texto');
  }
  if (descricao !== undefined && typeof descricao !== 'string') {
    erros.push('descricao deve ser texto');
  }
  if (concluida !== undefined && typeof concluida !== 'boolean') {
    erros.push('concluida deve ser verdadeiro ou falso');
  }

  if (erros.length > 0) {
    return res.status(400).json({ erros });
  }
  next();
}

module.exports = validarTarefa;
