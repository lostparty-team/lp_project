const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs"); // YAML 파일 로드 패키지

const swaggerDocs = YAML.load('./swagger.yaml'); // swagger.yaml 파일 로드

const visitorTracker = require('./middleware/visitorTracker');

app.use(express.json({ limit: '10mb' })); // POST 요청의 JSON 데이터 파싱

app.use(cors({
  origin: 'http://localhost:3000', // React 도메인
  methods: ['GET', 'POST', 'DELETE'],
}));

// Swagger UI 연결
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs)
);

// 라우터 관리 부분
const testRouter = require("./router/test");
const partyRouter = require("./router/party");
const blacklistRouter = require("./router/blacklist");
const userdataRouter = require("./router/userdata");

app.use("/product", testRouter);
app.use("/party", partyRouter);
app.use("/api/blacklist", blacklistRouter);
app.use("/userdata", visitorTracker, userdataRouter);

// 서버 실행
app.listen(5000, () => {
  console.log('Express 서버가 http://localhost:5000 에서 실행 중입니다.');
  console.log('API documentation available at http://localhost:5000/api-docs');
});
