const { INCORRECT_REQUEST } = require('../utils/status');

const msg1 = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
const msg2 = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
const msg3 = 'O campo "rate" deve ser um inteiro de 1 à 5';

// https://stackoverflow.com/questions/5465375/javascript-date-regex-dd-mm-yyyy

function parseDate(date) {
  const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  return regex.test(date);
}

const talkFieldIsRequired = (request, response, next) => {
  const { talk } = request.body;
  if (!talk || !talk.watchedAt || talk.rate === undefined) {
    response.status(INCORRECT_REQUEST).json({
      message: msg1 });
  }
  next();
};

const talkField = (request, response, next) => {
  const { talk: { watchedAt, rate } } = request.body;
  if (!parseDate(watchedAt)) {
    response
      .status(INCORRECT_REQUEST)
      .json({ message: msg2 });
    return;
  }
  if (rate < 1 || rate > 5 || !Number.isInteger(rate)) {
    response
      .status(INCORRECT_REQUEST)
      .json({ message: msg3 });
    return;
  }
  next();
};

module.exports = { talkField, talkFieldIsRequired };
