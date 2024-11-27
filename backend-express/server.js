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

app.use("/product", testRouter);

// 라우터 관리 부분 끝


app.listen(5000, () => {
  console.log('Express server running on http://localhost:5000');
});
