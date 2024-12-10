const express = require('express');
const router = express.Router();
const db = require('../config/db'); // MySQL 연결 가져오기
const authenticateToken = require('../middleware/authenticateToken'); // 인증 미들웨어 추가

/**
 * @swagger
 * tags:
 *   name: Blacklist
 *   description: 블랙리스트 관리 API
 */

/**
 * @swagger
 * /api/blacklist/{title}:
 *   get:
 *     summary: "특정 블랙리스트 상세 조회"
 *     description: "제목에 해당하는 블랙리스트 상세 데이터를 조회합니다."
 *     tags: [Blacklist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: title
 *         in: path
 *         required: true
 *         description: "조회할 블랙리스트의 제목"
 *         schema:
 *           type: string
 *           example: "블랙리스트 상세 페이지"
 *     responses:
 *       200:
 *         description: "블랙리스트 상세 조회 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "블랙리스트 세부 정보를 성공적으로 조회했습니다."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nickname:
 *                         type: string
 *                         example: "나쁜사람123"
 *                       reason:
 *                         type: string
 *                         example: "거래 후 잠수"
 *       404:
 *         description: "해당 제목의 블랙리스트를 찾을 수 없음"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "해당 글제목의 블랙리스트를 찾을 수 없습니다."
 *       500:
 *         description: "서버 오류"
 */

/**
 * @swagger
 * /api/blacklist:
 *   get:
 *     summary: "블랙리스트 제목 목록 조회"
 *     description: "중복 제거된 블랙리스트 제목과 작성자 목록을 조회합니다."
 *     tags: [Blacklist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "블랙리스트 제목 목록 조회 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "글제목-작성자 목록을 성공적으로 조회했습니다."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: "블랙리스트"
 *                       author:
 *                         type: string
 *                         example: "admin123"
 *       500:
 *         description: "서버 오류"
 */

/**
 * @swagger
 * /api/blacklist/create:
 *   post:
 *     summary: "블랙리스트 작성"
 *     description: "새로운 블랙리스트를 작성합니다."
 *     tags: [Blacklist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: "블랙리스트 제목"
 *                 example: "블랙리스트"
 *               author:
 *                 type: string
 *                 description: "작성자 ID"
 *                 example: "test"
 *               blacklist:
 *                 type: array
 *                 description: "블랙리스트 항목"
 *                 items:
 *                   type: object
 *                   properties:
 *                     nickname:
 *                       type: string
 *                       description: "닉네임"
 *                       example: "사기꾼123"
 *                     reason:
 *                       type: string
 *                       description: "사유"
 *                       example: "거래 후 잠수"
 *     responses:
 *       201:
 *         description: "블랙리스트 작성 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "블랙리스트가 성공적으로 작성되었습니다."
 *                 insertedRows:
 *                   type: integer
 *                   example: 3
 *       400:
 *         description: "요청 데이터 유효하지 않음"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "요청 데이터가 유효하지 않습니다."
 *       409:
 *         description: "중복된 블랙리스트 제목"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "동일한 제목으로 작성된 블랙리스트가 이미 존재합니다."
 *       500:
 *         description: "서버 오류"
 */

/**
 * @swagger
 * /api/blacklist/{title}:
 *   delete:
 *     summary: "블랙리스트 삭제"
 *     description: "제목에 해당하는 블랙리스트를 삭제합니다."
 *     tags: [Blacklist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: title
 *         in: path
 *         required: true
 *         description: "삭제할 블랙리스트의 제목"
 *         schema:
 *           type: string
 *           example: "블랙리스트"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: "삭제 요청자의 ID"
 *                 example: "test"
 *     responses:
 *       200:
 *         description: "블랙리스트 삭제 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "블랙리스트가 성공적으로 삭제되었습니다."
 *                 deletedRows:
 *                   type: integer
 *                   example: 5
 *       400:
 *         description: "요청 데이터 유효하지 않음"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "사용자 ID가 제공되지 않았습니다."
 *       403:
 *         description: "삭제 권한 없음"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "삭제 권한이 없습니다. 사용자 ID가 작성자와 일치하지 않습니다."
 *       404:
 *         description: "블랙리스트 찾을 수 없음"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "제목 '블랙리스트'에 해당하는 블랙리스트를 찾을 수 없습니다."
 *       500:
 *         description: "서버 오류"
 */


// 블랙리스트 상세 조회
router.get('/:title', authenticateToken, async (req, res) => {  // 인증 미들웨어 추가
  const { title } = req.params;

  try {
    const selectQuery = `SELECT nickname, reason FROM Blacklist WHERE title = ?`;
    const [rows] = await db.query(selectQuery, [title]);

    if (rows.length === 0) {
      console.log('해당 글제목의 블랙리스트를 찾을 수 없습니다.');
      return res.status(404).json({ message: '해당 글제목의 블랙리스트를 찾을 수 없습니다.' });
    }

    console.log(`글제목이 ${title}인 블랙리스트 데이터를 성공적으로 조회했습니다.`);
    res.status(200).json({
      message: '블랙리스트 세부 정보를 성공적으로 조회했습니다.',
      data: rows,
    });
  } catch (error) {
    console.error('블랙리스트 세부 정보를 조회하는 중 오류가 발생했습니다:', error);
    res.status(500).json({ message: '블랙리스트 세부 정보를 조회하지 못했습니다.', error });
  }
});

// 블랙리스트 목록 조회
router.get('/', authenticateToken, async (req, res) => {  // 인증 미들웨어 추가
  try {
    const selectQuery = `SELECT DISTINCT title, author FROM Blacklist ORDER BY title ASC`;
    const [rows] = await db.query(selectQuery);

    console.log('중복 제거된 글제목-작성자 목록을 성공적으로 조회했습니다.');
    console.log([rows][0])
    res.status(200).json({
      message: '글제목-작성자 목록을 성공적으로 조회했습니다.',
      data: rows,
    });
  } catch (error) {
    console.error('글제목-작성자 목록을 조회하는 중 오류가 발생했습니다:', error);
    res.status(500).json({ message: '글제목-작성자 목록을 조회하지 못했습니다.', error });
  }
});

// 블랙리스트 작성
router.post('/create', authenticateToken, async (req, res) => {  // 인증 미들웨어 추가
  const { title, author, blacklist } = req.body;

  if (!title || !author || !Array.isArray(blacklist) || blacklist.length === 0) {
    console.log('요청 데이터가 유효하지 않습니다.');
    return res.status(400).json({ message: '요청 데이터가 유효하지 않습니다.' });
  }

  try {
    // 중복 확인 쿼리
    const checkQuery = `SELECT COUNT(*) AS count FROM Blacklist WHERE title = ? AND author = ?`;
    const [checkResult] = await db.query(checkQuery, [title, author]);

    if (checkResult[0].count > 0) {
      console.log(`이미 동일한 제목(${title})과 작성자(${author})가 존재합니다.`);
      return res.status(409).json({ message: '동일한 제목으로 작성된 블랙리스트가 이미 존재합니다.' });
    }

    // 중복이 없으면 데이터 추가
    const insertValues = blacklist.map(({ nickname, reason }) => [title, author, nickname, reason]);
    const insertQuery = `INSERT INTO Blacklist (title, author, nickname, reason) VALUES ?`;
    const [insertResult] = await db.query(insertQuery, [insertValues]);

    console.log(`${insertResult.affectedRows}개의 블랙리스트 데이터를 성공적으로 추가했습니다.`);
    res.status(201).json({
      message: '블랙리스트가 성공적으로 작성되었습니다.',
      insertedRows: insertResult.affectedRows,
    });
  } catch (error) {
    console.error('블랙리스트를 작성하는 중 오류가 발생했습니다:', error);
    res.status(500).json({ message: '블랙리스트를 작성하지 못했습니다.', error });
  }
});

// DELETE 요청: 블랙리스트 삭제 (글 제목 기반)
router.delete('/:title', authenticateToken, async (req, res) => {  // 인증 미들웨어 추가
  const { title } = req.params;
  const { userId } = req.body; // 요청한 사용자의 ID

  if (!userId) {
    console.log('사용자 ID가 제공되지 않았습니다.');
    return res.status(400).json({ message: '사용자 ID가 제공되지 않았습니다.' });
  }

  try {
    // 해당 제목의 블랙리스트 작성자 확인
    const selectQuery = `SELECT author FROM Blacklist WHERE title = ? LIMIT 1`;
    const [rows] = await db.query(selectQuery, [title]);

    if (rows.length === 0) {
      console.log(`제목 '${title}'에 해당하는 블랙리스트를 찾을 수 없습니다.`);
      return res.status(404).json({ message: `제목 '${title}'에 해당하는 블랙리스트를 찾을 수 없습니다.` });
    }

    const { author } = rows[0];

    // 작성자와 요청 사용자의 ID 비교
    if (author !== userId) {
      console.log('삭제 권한이 없습니다. 사용자 ID가 작성자와 일치하지 않습니다.');
      return res.status(403).json({ message: '삭제 권한이 없습니다. 사용자 ID가 작성자와 일치하지 않습니다.' });
    }

    // 삭제 쿼리 실행 (같은 제목의 모든 데이터 삭제)
    const deleteQuery = `DELETE FROM Blacklist WHERE title = ?`;
    const [result] = await db.query(deleteQuery, [title]);

    console.log(`제목 '${title}'에 해당하는 블랙리스트 데이터를 성공적으로 삭제했습니다.`);
    res.status(200).json({
      message: '블랙리스트가 성공적으로 삭제되었습니다.',
      deletedRows: result.affectedRows,
    });
  } catch (error) {
    console.error('블랙리스트를 삭제하는 중 오류가 발생했습니다:', error);
    res.status(500).json({ message: '블랙리스트를 삭제하지 못했습니다.', error });
  }
});

module.exports = router;
