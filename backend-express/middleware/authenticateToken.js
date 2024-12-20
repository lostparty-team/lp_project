const axios = require('axios');
require('dotenv').config();

async function authenticateToken(req, res, next) {
  // Authorization 헤더에서 JWT 토큰 추출
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: '토큰이 제공되지 않았습니다.' });
  }

  try {
    // NestJS로 토큰 검증 요청
    const response = await axios.get('http://localhost:4000/user/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    // NestJS에서 반환한 사용자 정보를 req.user에 저장
    req.user = response.data;
    next(); // 다음 미들웨어 또는 라우트로 진행
  } catch (error) {
    // NestJS 요청 실패 또는 인증 실패 처리
    if (error.response && error.response.status === 401) {
      return res.status(401).json({ error: '유효하지 않은 토큰입니다.' });
    }
    console.error('토큰 검증 중 오류 발생:', error.message);
    res.status(500).json({ error: '인증 서버와 통신 중 문제가 발생했습니다.' });
  }
}

module.exports = authenticateToken;
