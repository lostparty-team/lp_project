// JWT 디코딩 미들웨어
const extractClientIdAndApiKey = (req, res, next) => {
  const authorizationHeader = req.headers['authorization']; // Authorization 헤더 가져오기

  if (!authorizationHeader) {
    return res.status(400).json({ message: 'API Key가 필요합니다.' });
  }

  try {
    const payload = JSON.parse(Buffer.from(authorizationHeader.split('.')[1], 'base64').toString('utf-8')); // JWT payload 디코딩
    req.clientId = payload.client_id; // 요청 객체에 clientId 추가
    req.apikey = authorizationHeader; // 요청 객체에 apikey 추가
    next(); // 다음 미들웨어 또는 라우터로 진행
  } catch (error) {
    console.error('JWT 디코딩 중 오류 발생:', error);
    return res.status(400).json({ message: '유효하지 않은 API Key입니다.' });
  }
};

module.exports = extractClientIdAndApiKey;
