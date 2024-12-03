const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json()); // POST 요청의 JSON 데이터 파싱

app.use(cors({
    origin: 'http://localhost:3000', // React 도메인
    methods: ['GET', 'POST'],
  }));

// 라우터 관리 부분 시작

const testRouter = require("./router/test");
const partyRouter = require("./router/party");
const blacklistRouter = require("./router/blacklist");

app.use("/product", testRouter);
app.use("/party", partyRouter);
app.use("/api/blacklist", blacklistRouter);

// 라우터 관리 부분 끝


app.listen(5000, () => {
  console.log('Express server running on http://localhost:5000');
});
