const { INCORRECT_REQUEST } = require('../utils/status');

const msg1 = 'O campo "name" é obrigatório';
const msg2 = 'O "name" deve ter pelo menos 3 caracteres';
const msg3 = 'O campo "age" é obrigatório';
const msg4 = 'A pessoa palestrante deve ser maior de idade';

const talkerRegister = (request, response, next) => {
  const { name, age } = request.body;
  if (!name) {
    response.status(INCORRECT_REQUEST).json({ message: msg1 });
    return;
  }
  if (name.length < 3) {
    response.status(INCORRECT_REQUEST).json({ message: msg2 });
    return;
  }
  if (!age) {
    response.status(INCORRECT_REQUEST).json({ message: msg3 });
    return;
  }
  if (age < 18) {
    response.status(INCORRECT_REQUEST).json({ message: msg4 });
    return;
  }
  next();
};

module.exports = talkerRegister;
