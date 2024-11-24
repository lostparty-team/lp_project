const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json()); // POST 요청의 JSON 데이터 파싱

app.use(cors({
    origin: 'http://localhost:3000', // React 도메인
    methods: ['GET', 'POST'],
  }));

app.get('/product', (req, res) => {
  res.json({ name: 'Express Productasdasdasdsa' }); // Express 서버가 반환하는 JSON
});

app.listen(5000, () => {
  console.log('Express server running on http://localhost:5000');
});
