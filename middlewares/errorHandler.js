const INTERNAL_SERVER_ERROR = 500;

const errorHandler = (error, _req, res) =>
  res.status(error.status || INTERNAL_SERVER_ERROR).json({ message: error.message });

module.exports = errorHandler;
