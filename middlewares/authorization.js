const { INTERNAL_SERVER_ERROR, UNAUTHORIZED_STATUS } = require('../utils/status');

module.exports = (request, response, next) => {
  try {
    const { authorization } = request.headers;
    if (!authorization) {
      return response.status(UNAUTHORIZED_STATUS).json({ message: 'Token não encontrado' });
    }
    if (authorization.length !== 16) {
      return response.status(UNAUTHORIZED_STATUS).json({ message: 'Token inválido' });
    }
    return next();
  } catch (error) {
    return response.status(INTERNAL_SERVER_ERROR).json({ message: error });
  }
};
