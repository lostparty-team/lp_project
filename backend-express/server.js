const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger/swagger");
const basicAuth = require("express-basic-auth");

// 별도로 분리된 미들웨어 가져오기
const authenticateToken = require('./middleware/authenticateToken');
const visitorTracker = require('./middleware/visitorTracker');

app.use(express.json({ limit: '10mb' })); // 기본값은 '100kb'  // POST 요청의 JSON 데이터 파싱

app.use(cors({
  origin: 'http://localhost:3000', // React 도메인
  methods: ['GET', 'POST', 'DELETE'],
}));

// Swagger UI 연결
// Swagger Basic Auth 설정
app.use(
  "/api-docs",
  // api 문서 로그인해서 들어오게 하려면 활성화
  // basicAuth({
  //   users: { [process.env.SWAGGER_USER]: process.env.SWAGGER_PASS }, // .env에서 id, pw 가져오기
  //   challenge: true, // 인증 창 표시
  //   unauthorizedResponse: "권한이 없습니다.", // 인증 실패 메시지
  // }),
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs)
);

// 라우터 관리 부분
const testRouter = require("./router/test");
const partyRouter = require("./router/party");
const blacklistRouter = require("./router/blacklist");
const userdataRouter = require("./router/userdata")

// 인증이 필요한 라우터
app.use("/product", authenticateToken, testRouter);
app.use("/party", partyRouter);
app.use("/api/blacklist", blacklistRouter);
app.use("/userdata", visitorTracker, userdataRouter);

// 서버 실행
app.listen(5000, () => {
  console.log('Express 서버가 http://localhost:5000 에서 실행 중입니다.');
});
