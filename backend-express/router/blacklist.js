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
 * /api/blacklist:
 *   get:
 *     summary: "블랙리스트 제목 목록 조회"
 *     description: "글번호, 제목, 작성자 목록을 조회합니다."
 *     tags: [Blacklist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "글번호-글제목-작성자 목록 조회 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "글번호-글제목-작성자 목록을 성공적으로 조회했습니다."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: "악성유저리스트"
 *                       author:
 *                         type: string
 *                         example: "author1"
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
 * /api/blacklist/{id}:
 *   get:
 *     summary: "특정 블랙리스트 상세 조회"
 *     description: "글번호를 기준으로 블랙리스트 상세 데이터를 조회합니다."
 *     tags: [Blacklist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: "조회할 블랙리스트의 글번호"
 *         schema:
 *           type: integer
 *           example: 1
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
 *                 post:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "악성유저리스트"
 *                     author:
 *                       type: string
 *                       example: "author1"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nickname:
 *                         type: string
 *                         example: "악성유저123"
 *                       reason:
 *                         type: string
 *                         example: "거래 후 잠수"
 *       404:
 *         description: "해당 글번호의 블랙리스트를 찾을 수 없음"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "글번호 1에 해당하는 블랙리스트를 찾을 수 없습니다."
 *       500:
 *         description: "서버 오류"
 */


/**
 * @swagger
 * /api/blacklist/{id}:
 *   delete:
 *     summary: "블랙리스트 삭제"
 *     description: "글번호를 기준으로 블랙리스트를 삭제합니다. JWT 토큰을 사용하여 요청자를 인증합니다."
 *     tags: [Blacklist]
 *     security:
 *       - bearerAuth: [] # JWT 토큰 인증
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: "삭제할 블랙리스트의 글번호"
 *         schema:
 *           type: integer
 *           example: 1
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
 *                   example: "블랙리스트 및 게시글이 성공적으로 삭제되었습니다."
 *                 deletedRows:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: "JWT 토큰에서 clientId를 확인할 수 없음"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "JWT 토큰에서 clientId를 확인할 수 없습니다."
 *       403:
 *         description: "삭제 권한 없음"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "삭제 권한이 없습니다. JWT의 clientId가 작성자의 clientId와 일치하지 않습니다."
 *       404:
 *         description: "해당 글번호의 블랙리스트를 찾을 수 없음"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "글번호 1에 해당하는 블랙리스트를 찾을 수 없습니다."
 *       500:
 *         description: "서버 오류"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "블랙리스트를 삭제하지 못했습니다."
 */

/**
 * @swagger
 * /api/blacklist/dislike/{id}:
 *   post:
 *     summary: "비추천 수 증가"
 *     description: "게시글의 비추천 수를 1 증가시킵니다. 같은 사용자가 중복 비추천은 할 수 없습니다."
 *     tags: [Blacklist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: "비추천할 게시글의 ID"
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: "비추천 수 증가 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "비추천이 성공적으로 처리되었습니다."
 *       404:
 *         description: "게시글을 찾을 수 없음"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "글번호 1에 해당하는 게시글을 찾을 수 없습니다."
 *       409:
 *         description: "이미 비추천한 게시글"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "이미 비추천한 게시글입니다."
 *       500:
 *         description: "서버 오류"
 */

/**
 * @swagger
 * /api/blacklist/cart:
 *   get:
 *     summary: "유저 장바구니 조회"
 *     description: "JWT 토큰의 clientId를 사용하여 장바구니에 담긴 블랙리스트 글 목록을 조회합니다."
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "장바구니 조회 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "장바구니 데이터를 성공적으로 조회했습니다."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       postId:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: "악성유저리스트"
 *                       author:
 *                         type: string
 *                         example: "author1"
 *       500:
 *         description: "서버 오류"
 */

/**
 * @swagger
 * /api/blacklist/cart/{id}:
 *   post:
 *     summary: "장바구니 추가"
 *     description: "특정 블랙리스트 글을 유저의 장바구니에 추가합니다."
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: "장바구니에 추가할 블랙리스트 글 번호"
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       201:
 *         description: "장바구니 추가 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "장바구니에 성공적으로 추가되었습니다."
 *       409:
 *         description: "이미 장바구니에 추가된 게시글"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "이미 장바구니에 추가된 게시글입니다."
 *       500:
 *         description: "서버 오류"
 */

/**
 * @swagger
 * /api/blacklist/cart/{id}:
 *   delete:
 *     summary: "장바구니 삭제"
 *     description: "특정 블랙리스트 글을 유저의 장바구니에서 삭제합니다."
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: "장바구니에서 삭제할 블랙리스트 글 번호"
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: "장바구니 삭제 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "장바구니에서 성공적으로 삭제되었습니다."
 *       404:
 *         description: "장바구니에 해당 게시글이 없음"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "장바구니에 해당 게시글이 없습니다."
 *       500:
 *         description: "서버 오류"
 */


// 블랙리스트 목록 조회
router.get('/', authenticateToken, async (req, res) => {
  try {
    const selectQuery = `
      SELECT 
        p.id, 
        p.title, 
        p.author, 
        p.views, 
        COUNT(d.id) AS dislikes -- 비추천 수 추가
      FROM Posts p
      LEFT JOIN Dislike d ON p.id = d.postId
      GROUP BY p.id, p.title, p.author, p.views
      ORDER BY p.id ASC
    `;
    const [rows] = await db.query(selectQuery);

    console.log('글번호-글제목-작성자-조회수-비추천수 목록을 성공적으로 조회했습니다.');
    res.status(200).json({
      message: '글번호-글제목-작성자-조회수-비추천수 목록을 성공적으로 조회했습니다.',
      data: rows,
    });
  } catch (error) {
    console.error('목록 조회 중 오류 발생:', error);
    res.status(500).json({ message: '목록 조회 실패', error });
  }
});




// 블랙리스트 작성
router.post('/create', authenticateToken, async (req, res) => {
  const { title, author, blacklist } = req.body;

  if (!title || !author || !Array.isArray(blacklist) || blacklist.length === 0) {
    return res.status(400).json({ message: '요청 데이터가 유효하지 않습니다.' });
  }

  let connection;
  try {
    connection = await db.getConnection();
    await connection.beginTransaction();

    const insertPostQuery = `INSERT INTO Posts (title, author) VALUES (?, ?)`;
    const [postResult] = await connection.query(insertPostQuery, [title, author]);
    const postId = postResult.insertId;

    const insertValues = blacklist.map(({ nickname, reason }) => [postId, nickname, reason]);
    const insertBlacklistQuery = `INSERT INTO Blacklist (postId, nickname, reason) VALUES ?`;
    await connection.query(insertBlacklistQuery, [insertValues]);

    await connection.commit();

    res.status(201).json({
      message: '게시글과 블랙리스트가 성공적으로 작성되었습니다.',
      postId,
    });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error('게시글과 블랙리스트를 작성하는 중 오류가 발생했습니다:', error);
    res.status(500).json({ message: '게시글과 블랙리스트를 작성하지 못했습니다.', error });
  } finally {
    if (connection) await connection.release();
  }
});




// 비추천 추가
router.post('/dislike/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { clientId } = req.user;

  if (!clientId) {
    return res.status(400).json({ message: 'JWT 토큰에서 clientId를 확인할 수 없습니다.' });
  }

  try {
    const checkDislikeQuery = `SELECT * FROM Dislike WHERE postId = ? AND clientId = ?`;
    const [existingDislike] = await db.query(checkDislikeQuery, [id, clientId]);

    if (existingDislike.length > 0) {
      return res.status(409).json({ message: '이미 비추천한 게시글입니다.' });
    }

    const insertDislikeQuery = `INSERT INTO Dislike (postId, clientId) VALUES (?, ?)`;
    await db.query(insertDislikeQuery, [id, clientId]);

    res.status(200).json({ message: '비추천이 성공적으로 처리되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: '비추천을 처리하지 못했습니다.', error });
  }
});


// 유저 장바구니 조회 (추천수, 조회수, 비추천수 제외)
router.get('/cart', authenticateToken, async (req, res) => {
  const { clientId } = req.user; // JWT에서 추출된 clientId

  console.log('장바구니 조회 요청자 clientId:', clientId);

  if (!clientId) {
    console.log('JWT 토큰에서 clientId를 확인할 수 없습니다.');
    return res.status(400).json({ message: 'JWT 토큰에서 clientId를 확인할 수 없습니다.' });
  }

  try {
    const selectCartQuery = `
      SELECT 
        c.postId, 
        p.title, 
        p.author
      FROM Cart c
      JOIN Posts p ON c.postId = p.id
      WHERE c.clientId = ?
    `;
    const [rows] = await db.query(selectCartQuery, [clientId]);

    console.log(`clientId ${clientId}의 장바구니 데이터를 성공적으로 조회했습니다.`);
    res.status(200).json({
      message: '장바구니 데이터를 성공적으로 조회했습니다.',
      data: rows,
    });
  } catch (error) {
    console.error('장바구니 데이터를 조회하는 중 오류가 발생했습니다:', error);
    res.status(500).json({ message: '장바구니 데이터를 조회하지 못했습니다.', error });
  }
});


// 블랙리스트 글 장바구니에 담기
router.post('/cart/:id', authenticateToken, async (req, res) => {
  const { id } = req.params; // 글 번호
  const { clientId } = req.user; // JWT에서 추출된 clientId

  // 요청자의 clientId 출력
  console.log('장바구니 추가 요청자 clientId:', clientId);

  if (!clientId) {
    console.log('JWT 토큰에서 clientId를 확인할 수 없습니다.');
    return res.status(400).json({ message: 'JWT 토큰에서 clientId를 확인할 수 없습니다.' });
  }

  try {
    // 장바구니에 추가
    const insertCartQuery = `INSERT INTO Cart (clientId, postId) VALUES (?, ?)`;
    await db.query(insertCartQuery, [clientId, id]);

    console.log(`clientId ${clientId}가 글번호 ${id}를 장바구니에 추가했습니다.`);
    res.status(201).json({ message: '장바구니에 성공적으로 추가되었습니다.' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.log(`clientId ${clientId}가 이미 글번호 ${id}를 장바구니에 추가했습니다.`);
      return res.status(409).json({ message: '이미 장바구니에 추가된 게시글입니다.' });
    }
    console.error('장바구니에 추가하는 중 오류가 발생했습니다:', error);
    res.status(500).json({ message: '장바구니에 추가하지 못했습니다.', error });
  }
});

// 블랙리스트 글 장바구니에서 삭제
router.delete('/cart/:id', authenticateToken, async (req, res) => {
  const { id } = req.params; // 글 번호
  const { clientId } = req.user; // JWT에서 추출된 clientId

  // 요청자의 clientId 출력
  console.log('장바구니 삭제 요청자 clientId:', clientId);

  if (!clientId) {
    console.log('JWT 토큰에서 clientId를 확인할 수 없습니다.');
    return res.status(400).json({ message: 'JWT 토큰에서 clientId를 확인할 수 없습니다.' });
  }

  try {
    // 장바구니에서 삭제
    const deleteCartQuery = `DELETE FROM Cart WHERE clientId = ? AND postId = ?`;
    const [result] = await db.query(deleteCartQuery, [clientId, id]);

    if (result.affectedRows === 0) {
      console.log(`clientId ${clientId}가 장바구니에서 글번호 ${id}를 찾을 수 없습니다.`);
      return res.status(404).json({ message: '장바구니에 해당 게시글이 없습니다.' });
    }

    console.log(`clientId ${clientId}가 글번호 ${id}를 장바구니에서 삭제했습니다.`);
    res.status(200).json({ message: '장바구니에서 성공적으로 삭제되었습니다.' });
  } catch (error) {
    console.error('장바구니에서 삭제하는 중 오류가 발생했습니다:', error);
    res.status(500).json({ message: '장바구니에서 삭제하지 못했습니다.', error });
  }
});

// 블랙리스트 상세 조회
router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    // 조회수 증가
    const incrementViewsQuery = `UPDATE Posts SET views = views + 1 WHERE id = ?`;
    await db.query(incrementViewsQuery, [id]);

    // 게시글 정보 가져오기
    const selectPostQuery = `SELECT title, author, views FROM Posts WHERE id = ?`;
    const [[post]] = await db.query(selectPostQuery, [id]);

    if (!post) {
      console.log(`글번호 ${id}에 해당하는 게시글을 찾을 수 없습니다.`);
      return res.status(404).json({ message: `글번호 ${id}에 해당하는 게시글을 찾을 수 없습니다.` });
    }

    // Blacklist 테이블에서 해당 글번호에 포함된 닉네임과 사유 조회
    const selectBlacklistQuery = `SELECT nickname, reason FROM Blacklist WHERE postId = ?`;
    const [details] = await db.query(selectBlacklistQuery, [id]);

    console.log(`글번호 ${id}의 블랙리스트 데이터를 성공적으로 조회했습니다.`);
    res.status(200).json({
      message: '블랙리스트 세부 정보를 성공적으로 조회했습니다.',
      post: {
        id,
        title: post.title,
        author: post.author,
        views: post.views,
      },
      data: details,
    });
  } catch (error) {
    console.error('블랙리스트 세부 정보를 조회하는 중 오류가 발생했습니다:', error);
    res.status(500).json({ message: '블랙리스트 세부 정보를 조회하지 못했습니다.', error });
  }
});

// 블랙리스트 삭제
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { clientId } = req.user;

  if (!clientId) {
    return res.status(400).json({ message: 'JWT 토큰에서 clientId를 확인할 수 없습니다.' });
  }

  try {
    const selectQuery = `SELECT u.clientId FROM Posts p JOIN User u ON p.author = u.userId WHERE p.id = ?`;
    const [[post]] = await db.query(selectQuery, [id]);

    if (!post) {
      return res.status(404).json({ message: `글번호 ${id}에 해당하는 게시글을 찾을 수 없습니다.` });
    }

    if (post.clientId !== clientId) {
      return res.status(403).json({ message: '삭제 권한이 없습니다.' });
    }

    const deleteBlacklistQuery = `DELETE FROM Blacklist WHERE postId = ?`;
    const deletePostQuery = `DELETE FROM Posts WHERE id = ?`;

    await db.query(deleteBlacklistQuery, [id]);
    const [result] = await db.query(deletePostQuery, [id]);

    res.status(200).json({
      message: '블랙리스트 및 게시글이 성공적으로 삭제되었습니다.',
      deletedRows: result.affectedRows,
    });
  } catch (error) {
    console.error('블랙리스트를 삭제하는 중 오류가 발생했습니다:', error);
    res.status(500).json({ message: '블랙리스트를 삭제하지 못했습니다.', error });
  }
});

module.exports = router;
