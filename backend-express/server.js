const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// JWT 검증 미들웨어
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

app.use(express.json()); // POST 요청의 JSON 데이터 파싱

app.use(cors({
  origin: 'http://localhost:3000', // React 도메인
  methods: ['GET', 'POST'],
}));

// 라우터 관리 부분
const testRouter = require("./router/test");
const partyRouter = require("./router/party");
const blacklistRouter = require("./router/blacklist");

// 인증이 필요한 라우터
app.use("/product", authenticateToken, testRouter);
app.use("/party", authenticateToken, partyRouter);
app.use("/api/blacklist", authenticateToken, blacklistRouter);

// 서버 실행
app.listen(5000, () => {
  console.log('Express 서버가 http://localhost:5000 에서 실행 중입니다.');
});
