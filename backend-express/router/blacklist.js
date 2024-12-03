const express = require('express');
const router = express.Router();
const db = require('../config/db'); // MySQL 연결 가져오기

// POST 요청: 블랙리스트 데이터 삽입 및 조회
router.post('/', async (req, res) => {
  const { title, author, blacklist } = req.body;

  // 요청 데이터 유효성 검사
  if (!title || !author || !Array.isArray(blacklist) || blacklist.length === 0) {
    return res.status(400).json({ message: 'Invalid request data' });
  }

  try {
    // 데이터 준비: created_at은 자동으로 채워지므로 포함하지 않음
    const insertValues = blacklist.map(({ nickname, reason }) => [title, author, nickname, reason]);

    // 데이터 삽입 쿼리
    const insertQuery = `
      INSERT INTO Blacklist (title, author, nickname, reason)
      VALUES ?
    `;
    const [insertResult] = await db.query(insertQuery, [insertValues]);

    console.log(`Inserted ${insertResult.affectedRows} rows successfully.`);

    // 삽입된 데이터 조회 쿼리
    const selectQuery = `SELECT * FROM Blacklist`;
    const [rows] = await db.query(selectQuery);

    console.log('Retrieved data:', rows);

    res.status(201).json({
      message: 'Blacklist data inserted and retrieved successfully',
      insertedRows: insertResult.affectedRows,
      data: rows, // 삽입된 데이터 응답에 포함
    });
  } catch (error) {
    console.error('Error inserting or retrieving data:', error);
    res.status(500).json({ message: 'Failed to insert or retrieve data', error });
  }
});

module.exports = router;
