const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { User } = require('../db/models');

const extractToken = (authorizationHeader = '') => {
  const [scheme, token] = authorizationHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return null;
  }

  return token;
};

const authenticate = async (req, res, next) => {
  try {
    const token = extractToken(req.headers.authorization);

    if (!token) {
      return res.status(401).json({ message: 'Authentication token is required.' });
    }

    const payload = jwt.verify(token, env.jwtSecret);
    const user = await User.findByPk(payload.sub);

    if (!user) {
      return res.status(401).json({ message: 'Invalid authentication token.' });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication is required.' });
  }

  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: 'You do not have permission for this action.' });
  }

  return next();
};

module.exports = {
  authenticate,
  authorize
};

