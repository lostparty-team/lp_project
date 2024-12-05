const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,          // Docker Compose에서 MySQL 서비스 이름
  port: process.env.DB_PORT,            // MySQL 포트
  user: process.env.DB_USER,          // MySQL 사용자
  password: process.env.DB_PASSWORD, // MySQL 비밀번호
  database: process.env.DB_NAME, // MySQL 데이터베이스 이름
  waitForConnections: true,
  connectionLimit: 10, // 기본값임
  queueLimit: 0, // 기본값임
});

module.exports = pool;