const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'mysql',          // Docker Compose에서 MySQL 서비스 이름
  port: process.env.DB_PORT || 3306,            // MySQL 포트
  user: process.env.DB_USER || 'root',          // MySQL 사용자
  password: process.env.DB_PASSWORD || 'lp1346', // MySQL 비밀번호
  database: process.env.DB_NAME || 'lp_project', // MySQL 데이터베이스 이름
  waitForConnections: true,
  connectionLimit: 10, // 기본값임
  queueLimit: 0, // 기본값임
});

module.exports = pool;