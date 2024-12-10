const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {

  // 테스트 환경을 제외하고는 전부 지워야함
  if (process.env.NODE_ENV === "test") {
    // 테스트 환경에서는 인증 건너뜀
    req.user = { clientId: "1000000000057155" }; // Mock 데이터 설정
    return next();
  }

  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: '토큰이 제공되지 않았습니다.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, clientId) => {
    if (err) {
      return res.status(403).json({ error: '유효하지 않거나 만료된 토큰입니다.' });
    }
    req.user = clientId; // JWT의 payload 정보 저장
    next();
  });
}

module.exports = authenticateToken;
