const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { token: tokenGenerator } = require('./token');
const middlewares = require('./middlewares');
const { HTTP_OK_STATUS, NOT_FOUND_STATUS, CREATED_STATUS } = require('./utils/status');

const app = express(); // Criada uma nova aplicação Express
app.use(bodyParser.json());
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
  //  console.log(response);
});

// 1 - Crie o endpoint GET /talker
app.get('/talker', (_request, response) => { // Dizer ao Express que, ao tratar uma requisição com método GET no caminho /talker, envie o status HTTP 200, que significa OK, e o json dado
  const api = JSON.parse(fs.readFileSync('./talker.json'));
  response
    .status(HTTP_OK_STATUS)
    .json(api);
});

// 2 - Crie o endpoint GET /talker/:id
app.get('/talker/:id', (request, response) => {
  const { id: identifier } = request.params;
  const idApi = JSON.parse(fs.readFileSync('./talker.json'))
    .find(({ id }) => Number(id) === Number(identifier));
  if (idApi) return response.status(HTTP_OK_STATUS).json(idApi);
  response
    .status(NOT_FOUND_STATUS)
    .json({ message: 'Pessoa palestrante não encontrada' });
});

// app.use(middlewares.validationLogin);

// 3 - Crie o endpoint POST /login
app.post('/login', middlewares.validationLogin, (_request, response) => {
  const token = tokenGenerator();
  response
    .status(HTTP_OK_STATUS)
    .json({ token });
});

app.post('/talker',
  middlewares.authorization,
  middlewares.talkerRegister,
  middlewares.talkFieldIsRequired,
  middlewares.talkField,
  (request, response) => {
    const { name, age, talk } = request.body;
    const api = JSON.parse(fs.readFileSync('./talker.json'));
    const lastId = api[api.length - 1];
    const id = lastId === undefined ? 0 : lastId.id + 1;
    const newOBJ = { id, name, age, talk };
    api.push(newOBJ);
    fs.writeFileSync('./talker.json', JSON.stringify(api), 'utf-8');
    response.status(CREATED_STATUS).json(newOBJ);
  });

// app.use(middlewares.errorHandler);

app.listen(PORT, () => { // Pedir ao Express que crie um servidor HTTP e escute por requisições na porta 3000
  console.log('Online');
}); 
