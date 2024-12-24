const axios = require('axios');
require('dotenv').config();

async function authenticateToken(req, res, next) {
  // Authorization 헤더에서 JWT 토큰 추출
  const authHeader = req.headers['authorization'];
  console.log('Authorization Header:', authHeader); // 디버깅용 로그

  if (!authHeader) {
    console.error('Authorization 헤더가 제공되지 않았습니다.');
    return res.status(401).json({ error: '토큰이 제공되지 않았습니다.' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    console.error('JWT 토큰이 헤더에 포함되지 않았습니다.');
    return res.status(401).json({ error: '토큰이 제공되지 않았습니다.' });
  }

  try {
    // NestJS로 토큰 검증 요청
    const response = await axios.get('http://localhost:4000/user/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    // 사용자 정보를 req.user에 저장
    req.user = response.data;

    next(); // 다음 미들웨어 또는 라우트로 진행
  } catch (error) {
    console.error('JWT 검증 중 오류 발생:', error.message);
    if (error.response) {
      console.error('NestJS 응답 상태:', error.response.status);
      console.error('NestJS 응답 데이터:', error.response.data);
    }
    res.status(403).json({ error: '유효하지 않은 토큰입니다.' });
  }
}

module.exports = authenticateToken;
