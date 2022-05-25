const { INTERNAL_SERVER_ERROR } = require('../utils/status');

const errorHandler = (error, _req, response) =>
  response.status(error.status || INTERNAL_SERVER_ERROR).json({ message: error.message });

module.exports = errorHandler;
