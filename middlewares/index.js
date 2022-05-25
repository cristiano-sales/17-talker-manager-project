const validationLogin = require('./login');
const errorHandler = require('./errorHandler');
const authorization = require('./authorization');
const talkerRegister = require('./talkerRegister');
const { talkField, talkFieldIsRequired } = require('./talkField');

module.exports = {
  validationLogin,
  errorHandler,
  authorization,
  talkerRegister,
  talkField,
  talkFieldIsRequired,
};
