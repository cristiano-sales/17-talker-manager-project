const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express(); // Criada uma nova aplicação Express
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const NOT_FOUND = 404;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
  //  console.log(response);
});

// 1 - Crie o endpoint GET /talker
app.get('/talker', (_request, response) => { // Dizer ao Express que, ao tratar uma requisição com método GET no caminho /talker, envie o status HTTP 200, que significa OK, e o json dado
  const api = JSON.parse(fs.readFileSync('./talker.json'));
  response.status(HTTP_OK_STATUS).json(api);
});

// 2 - Crie o endpoint GET /talker/:id
app.get('/talker/:id', (request, response) => {
  const { id: identifier } = request.params;
  const idApi = JSON.parse(fs.readFileSync('./talker.json'))
    .find(({ id }) => Number(id) === Number(identifier));
  if (idApi) return response.status(HTTP_OK_STATUS).json(idApi);
  response.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
});

app.listen(PORT, () => { // Pedir ao Express que crie um servidor HTTP e escute por requisições na porta 3000
  console.log('Online');
}); 
