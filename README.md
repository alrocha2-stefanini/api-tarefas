# API de Tarefas

API REST simples para gerenciar tarefas (to-do list), feita com Node.js e Express.

Projeto acadêmico para praticar Git Flow e colaboração via Pull Requests.

## Requisitos

- Node.js 18 ou superior

## Como executar

```bash
npm install
npm start
```

A API sobe em `http://localhost:3000` (use a variável `PORT` para mudar a porta).

## Testes

```bash
npm test
```

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /saude | Verifica se a API está no ar |
| GET | /tarefas | Lista todas as tarefas |
| GET | /tarefas/:id | Busca uma tarefa pelo id |
| POST | /tarefas | Cria uma tarefa |
| PUT | /tarefas/:id | Atualiza uma tarefa |
| DELETE | /tarefas/:id | Remove uma tarefa |

## Exemplo

```bash
curl -X POST http://localhost:3000/tarefas \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Estudar Git Flow", "descricao": "Praticar branches"}'
```
