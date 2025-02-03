const express = require('express');
const router = express.Router();
const db = require('../config/db'); // MySQL 연결 가져오기


// 유틸 함수: 오늘 날짜 포맷팅
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().slice(0, 10); // "YYYY-MM-DD" 형식으로 반환
};

// 메인 페이지 라우트
router.get('/', async (req, res) => {
  try {
    const today = getTodayDate();

    // 방문자 기록
    const visitorId = req.ip; // IP를 방문자 식별자로 사용
    const userAgent = req.headers['user-agent'];

    await db.query(
      'INSERT INTO Visitors (visitorId, ipAddress, userAgent) VALUES (?, ?, ?)',
      [visitorId, req.ip, userAgent]
    );

    // 블랙리스트 유저수 조회
    const [blacklistCount] = await db.query(
      'SELECT COUNT(*) AS count FROM Blacklist'
    );

    // 오늘 작성된 블랙리스트 유저수 조회
    const [todayBlacklistCount] = await db.query(
      'SELECT COUNT(*) AS count FROM Blacklist WHERE DATE(created_at) = ?',
      [today]
    );

    // 블랙리스트 게시글 수 조회
    const [PostsCount] = await db.query(
      'SELECT COUNT(*) AS count FROM Posts'
    );

    // 오늘 작성된 블랙리스트 게시글 수 조회
    const [todayPostsCount] = await db.query(
      'SELECT COUNT(*) AS count FROM Posts WHERE DATE(created_at) = ?',
      [today]
    );

    // 방문자 수 조회
    const [VisitorsCount] = await db.query(
      'SELECT COUNT(DISTINCT visitorId) AS count FROM Visitors'
    );

    // 오늘 방문자 수 조회
    const [todayVisitorsCount] = await db.query(
      'SELECT COUNT(DISTINCT visitorId) AS count FROM Visitors WHERE DATE(visitedAt) = ?',
      [today]
    );

    // JSON 응답 또는 메인 페이지 렌더링
    res.json({
      블랙리스트등록된유저수: blacklistCount[0].count,
      오늘블랙리스트등록된유저수: todayBlacklistCount[0].count,
      블랙리스트명단작성수: PostsCount[0].count,
      오늘블랙리스트명단작성수: todayPostsCount[0].count,
      방문자수: VisitorsCount[0].count,
      오늘방문자수: todayVisitorsCount[0].count,
    });
  } catch (error) {
    console.error('Error handling main page request:', error);
    res.status(500).send('An error occurred');
  }
});

module.exports = router;
