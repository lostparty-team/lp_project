const db = require('../config/db'); // MySQL 연결 가져오기

const visitorTracker = async (req, res, next) => {
  try {
    const visitorId = req.headers['x-forwarded-for'] || req.ip; // IP 주소
    const userAgent = req.headers['user-agent'] || 'Unknown'; // User-Agent

    await db.query(
      `INSERT INTO Visitors (visitorId, ipAddress, userAgent)
       SELECT ?, ?, ?
       WHERE NOT EXISTS (
         SELECT 1 FROM Visitors
         WHERE visitorId = ? AND visitedAt > NOW() - INTERVAL 1 HOUR
       )`,
      [visitorId, req.ip, userAgent, visitorId]
    );

    next();
  } catch (error) {
    console.error('Error tracking visitor:', error);
    next();
  }
};

// 모듈로 내보내기
module.exports = visitorTracker;
