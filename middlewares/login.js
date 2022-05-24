const isNotValid = (e) => {
  const regexEmail = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
  return !regexEmail.test(String(e).toLowerCase());
};

const INCORRECT_REQUEST = 400;
const msg1 = 'O campo "email" é obrigatório';
const msg2 = 'O campo "password" é obrigatório';
const msg3 = 'O "password" deve ter pelo menos 6 caracteres';
const msg4 = 'O "email" deve ter o formato "email@email.com"';

const validationLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    res.status(INCORRECT_REQUEST).json({ message: msg1 });
    return;
  }
  if (!password) {
    res.status(INCORRECT_REQUEST).json({ message: msg2 });
    return;
  }
  if (password.length < 6) {
    res.status(INCORRECT_REQUEST).json({ message: msg3 });
    return;
  }
  if (isNotValid(email)) {
    res.status(INCORRECT_REQUEST).json({ message: msg4 });
    return;
  }
  next();
};

module.exports = validationLogin;
