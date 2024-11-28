const express = require("express");
const router = express.Router();
const db = require('../config/db');

// POST /test: 테이블 생성
router.post('/test', async (req, res) => {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        age INT NOT NULL
      )
    `;
    await db.query(createTableQuery);
    res.json({ message: 'Table "users" created successfully' });
  } catch (err) {
    console.error('Database Create Table Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /test1: 데이터 삽입
router.post('/test1', async (req, res) => {
  const name = "Alice"; // 이름 지정
  const age = 25;       // 나이 지정
  try {
    const [result] = await db.query('INSERT INTO users (name, age) VALUES (?, ?)', [name, age]);
    res.json({ message: 'Data inserted successfully', id: result.insertId });
  } catch (err) {
    console.error('Database Insert Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /test2: 데이터 조회
router.get('/test2', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error('Database Query Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /test3: 데이터 삭제
router.delete('/test3', async (req, res) => {
  const id = 1; // 삭제할 데이터 ID 지정
  try {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: `Data with id ${id} deleted successfully` });
  } catch (err) {
    console.error('Database Delete Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /test4: 테이블 삭제
router.delete('/test4', async (req, res) => {
  try {
    const dropTableQuery = 'DROP TABLE IF EXISTS users';
    await db.query(dropTableQuery);
    res.json({ message: 'Table "users" dropped successfully' });
  } catch (err) {
    console.error('Database Drop Table Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 기본 GET /
router.get('/', (req, res) => {
  res.json({ name: 'Express Product Example' });
});

module.exports = router;
