const { INCORRECT_REQUEST } = require('../utils/status');

const isNotValid = (e) => {
  const regexEmail = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
  return !regexEmail.test(String(e).toLowerCase());
};

const msg1 = 'O campo "email" é obrigatório';
const msg2 = 'O campo "password" é obrigatório';
const msg3 = 'O "password" deve ter pelo menos 6 caracteres';
const msg4 = 'O "email" deve ter o formato "email@email.com"';

const validationLogin = (request, response, next) => {
  const { email, password } = request.body;
  if (!email) {
    response.status(INCORRECT_REQUEST).json({ message: msg1 });
    return;
  }
  if (!password) {
    response.status(INCORRECT_REQUEST).json({ message: msg2 });
    return;
  }
  if (password.length < 6) {
    response.status(INCORRECT_REQUEST).json({ message: msg3 });
    return;
  }
  if (isNotValid(email)) {
    response.status(INCORRECT_REQUEST).json({ message: msg4 });
    return;
  }
  next();
};

module.exports = validationLogin;
