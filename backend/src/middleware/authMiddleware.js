// authMiddleware.js
import jwt from 'jsonwebtoken';
import { secret } from '../config/jwtConfig.js';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    req.userId = user.id; // Attach user ID to request for use in controllers
    next();
  });
};

export default authMiddleware;
