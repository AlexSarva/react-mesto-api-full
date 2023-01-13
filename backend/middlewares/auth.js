const jwt = require('jsonwebtoken');
const { AuthorizationError } = require('../errors/authorizationError');

const { JWT_SECRET } = process.env;
const extractBearerToken = (tkn) => tkn.replace('Bearer ', '');

const auth = (req, res, next) => {
  let { authorization } = req.headers;
  if (!authorization) {
    authorization = req.cookies.jwt;
  }

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError('Необходима авторизация');
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new AuthorizationError('Необходима авторизация'));
    return;
  }

  req.user = payload;

  next();
};

module.exports = auth;
