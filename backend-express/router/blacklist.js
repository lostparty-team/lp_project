const express = require('express');
const router = express.Router();
const db = require('../config/db'); // MySQL 연결 가져오기
const extractClientId = require('../middleware/extractClientId');


// 블랙리스트 목록 조회 (검색 기능 포함)
router.get('/', async (req, res) => {
  const { page = 1, sort = 'latest', title = '' } = req.query;
  const limit = 10;
  const offset = (page - 1) * limit;

  let orderByClause = 'p.id DESC';
  if (sort === 'cart_count') {
    orderByClause = 'cart_count DESC';
  }

  try {
    // 검색어가 있을 경우 조건 추가
    const whereClause = title ? 'WHERE title LIKE ?' : '';
    const likePattern = `%${title}%`;

    // 전체 게시글 수 (검색어 적용 여부에 따라)
    const countQuery = `SELECT COUNT(*) AS totalPosts FROM Posts ${whereClause}`;
    const countParams = title ? [likePattern] : [];
    const [[{ totalPosts }]] = await db.query(countQuery, countParams);
    const totalPages = Math.ceil(totalPosts / limit);

    // 게시글 목록 조회
    const selectQuery = `
      SELECT 
        p.id, 
        p.title, 
        p.author, 
        p.views, 
        p.created_at, 
        COUNT(c.id) AS cart_count, 
        COUNT(d.id) AS dislikes 
      FROM Posts p
      LEFT JOIN Cart c ON p.id = c.postId
      LEFT JOIN Dislike d ON p.id = d.postId
      ${whereClause}
      GROUP BY p.id, p.title, p.author, p.views, p.created_at
      ORDER BY ${orderByClause}
      LIMIT ? OFFSET ?
    `;
    const selectParams = title ? [likePattern, limit, offset] : [limit, offset];
    const [rows] = await db.query(selectQuery, selectParams);

    res.status(200).json({
      message: '블랙리스트 목록을 성공적으로 조회했습니다.',
      data: rows,
      totalPosts,
      totalPages,
      currentPage: Number(page),
      sort,
      search: title,
    });
  } catch (error) {
    res.status(500).json({ message: '블랙리스트를 조회하지 못했습니다.', error });
  }
});

// 내가 작성한 블랙리스트 목록 조회
router.get('/myblacklist', extractClientId, async (req, res) => {
  const { page = 1, sort = 'latest', title = '' } = req.query;
  const limit = 10;
  const offset = (page - 1) * limit;
  const clientId = req.clientId;

  let orderByClause = 'p.id DESC';
  if (sort === 'cart_count') {
    orderByClause = 'cart_count DESC';
  }

  try {
    const whereConditions = ['p.author = ?'];
    const queryParams = [clientId];

    if (title) {
      whereConditions.push('p.title LIKE ?');
      queryParams.push(`%${title}%`);
    }

    const whereClause = 'WHERE ' + whereConditions.join(' AND ');

    // 전체 게시글 수
    const countQuery = `SELECT COUNT(*) AS totalPosts FROM Posts p ${whereClause}`;
    const [[{ totalPosts }]] = await db.query(countQuery, queryParams);
    const totalPages = Math.ceil(totalPosts / limit);

    // 게시글 목록 조회
    const selectQuery = `
      SELECT 
        p.id, 
        p.title, 
        p.author, 
        p.views, 
        p.created_at, 
        COUNT(c.id) AS cart_count, 
        COUNT(d.id) AS dislikes 
      FROM Posts p
      LEFT JOIN Cart c ON p.id = c.postId
      LEFT JOIN Dislike d ON p.id = d.postId
      ${whereClause}
      GROUP BY p.id, p.title, p.author, p.views, p.created_at
      ORDER BY ${orderByClause}
      LIMIT ? OFFSET ?
    `;
    const selectParams = [...queryParams, limit, offset];
    const [rows] = await db.query(selectQuery, selectParams);

    res.status(200).json({
      message: '내가 작성한 블랙리스트 목록을 성공적으로 조회했습니다.',
      data: rows,
      totalPosts,
      totalPages,
      currentPage: Number(page),
      sort,
      search: title,
    });
  } catch (error) {
    res.status(500).json({ message: '블랙리스트를 조회하지 못했습니다.', error });
  }
});


// 블랙리스트 작성
router.post('/create', extractClientId, async (req, res) => {
  const { title, blacklist } = req.body;
  const clientId = req.clientId; // 미들웨어에서 추출된 clientId 사용

  if (!title || !Array.isArray(blacklist) || blacklist.length === 0) {
    return res.status(400).json({ message: '요청 데이터가 유효하지 않습니다.' });
  }

  let connection;
  try {
    connection = await db.getConnection();
    await connection.beginTransaction();

    const insertPostQuery = `INSERT INTO Posts (title, author) VALUES (?, ?)`;
    const [postResult] = await connection.query(insertPostQuery, [title, clientId]);
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
router.post('/dislike/:id', extractClientId, async (req, res) => {
  const { id } = req.params;
  const clientId = req.clientId;

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
router.get('/cart', extractClientId, async (req, res) => {
  const clientId = req.clientId; // 미들웨어에서 추출된 clientId 사용

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
router.post('/cart/:id', extractClientId, async (req, res) => {
  const { id } = req.params; // 글 번호
  const clientId = req.clientId; // 미들웨어에서 추출된 clientId 사용

  try {
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
router.delete('/cart/:id', extractClientId, async (req, res) => {
  const { id } = req.params; // 글 번호
  const clientId = req.clientId; // 미들웨어에서 추출된 clientId 사용

  try {
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
router.get('/:id', extractClientId, async (req, res) => {
  const { id } = req.params;
  const clientId = req.clientId;

  try {
    await db.query(`UPDATE Posts SET views = views + 1 WHERE id = ?`, [id]);
    
    const selectPostQuery = `
      SELECT p.title, p.author, p.created_at, p.views, 
             (SELECT COUNT(*) FROM Dislike WHERE postId = ?) AS dislikes
      FROM Posts p WHERE p.id = ?
    `;
    const [[post]] = await db.query(selectPostQuery, [id, id]);

    if (!post) {
      return res.status(404).json({ message: `글번호 ${id}에 해당하는 게시글을 찾을 수 없습니다.` });
    }

    const selectBlacklistQuery = `SELECT nickname, reason FROM Blacklist WHERE postId = ?`;
    const [details] = await db.query(selectBlacklistQuery, [id]);

    const checkUserDislikeQuery = `SELECT COUNT(*) AS userDisliked FROM Dislike WHERE postId = ? AND clientId = ?`;
    const [[{ userDisliked }]] = await db.query(checkUserDislikeQuery, [id, clientId]);

    res.status(200).json({
      message: '블랙리스트 세부 정보를 성공적으로 조회했습니다.',
      post: {
        id,
        title: post.title,
        author: post.author,
        created_at: post.created_at,
        views: post.views,
        dislikes: post.dislikes,
        userDisliked: userDisliked > 0
      },
      data: details,
    });
  } catch (error) {
    res.status(500).json({ message: '블랙리스트 세부 정보를 조회하지 못했습니다.', error });
  }
});

// 블랙리스트 삭제
router.delete('/:id', extractClientId, async (req, res) => {
  const { id } = req.params; // 글번호
  const clientId = req.clientId; // 미들웨어에서 추출된 clientId 사용

  try {
    // 글번호에 해당하는 작성자(clientId) 조회
    const selectQuery = `SELECT author FROM Posts WHERE id = ?`;
    const [[post]] = await db.query(selectQuery, [id]);

    if (!post) {
      return res.status(404).json({ message: `글번호 ${id}에 해당하는 게시글을 찾을 수 없습니다.` });
    }

    // 요청한 clientId와 게시글의 작성자가 다른 경우 권한 없음 처리
    if (post.author !== clientId) {
      return res.status(403).json({ message: '삭제 권한이 없습니다.' });
    }

    // 블랙리스트 및 게시글 삭제
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
