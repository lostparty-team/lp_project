const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger/swagger");

// 별도로 분리된 미들웨어 가져오기
const authenticateToken = require('./middleware/authenticateToken');

app.use(express.json({ limit: '10mb' })); // 기본값은 '100kb'  // POST 요청의 JSON 데이터 파싱

app.use(cors({
  origin: 'http://localhost:3000', // React 도메인
  methods: ['GET', 'POST', 'DELETE'],
}));

// Swagger UI 연결
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 라우터 관리 부분
const testRouter = require("./router/test");
const partyRouter = require("./router/party");
const blacklistRouter = require("./router/blacklist");

// 인증이 필요한 라우터
app.use("/product", authenticateToken, testRouter);
app.use("/party", authenticateToken, partyRouter);
app.use("/api/blacklist", authenticateToken, blacklistRouter);

// // 임시 jwt 토큰 발급
// const jwt = require("jsonwebtoken");

// app.post("/generate-token", (req, res) => {
//   const payload = { clientId: req.body.clientId || "mockClientId" }; // Mock 데이터
//   const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || "secret", { expiresIn: "1h" });
//   res.json({ token });
// });

// 서버 실행
app.listen(5000, () => {
  console.log('Express 서버가 http://localhost:5000 에서 실행 중입니다.');
});
