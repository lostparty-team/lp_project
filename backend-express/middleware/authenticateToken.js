const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: '토큰이 제공되지 않았습니다.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: '유효하지 않거나 만료된 토큰입니다.' });
    }
    req.user = user; // JWT의 payload 정보 저장
    next();
  });
}

module.exports = authenticateToken;
