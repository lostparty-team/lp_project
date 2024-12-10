const express = require("express");
const router = express.Router();
const axios = require("axios");
const authenticateToken = require("../middleware/authenticateToken");
const db = require("../config/db"); // 데이터베이스 연결
const { 직업각인함수 } = require("./class");
const { 악세옵션목록분석, 보석검사 } = require("./optionsearch");

const HTML태그제거 = (input) => input.replace(/<[^>]*>/g, "");

const 무기레벨추출함수 = (input) => {
  const match = input.match(/\b\d{4}\b/);
  return match ? match[0] : null;
};

/**
 * @swagger
 * tags:
 *   name: party
 *   description: 닉네임 조회 API
 */

/**
 * @swagger
 * /party:
 *   post:
 *     summary: "닉네임 기반 캐릭터 정보 조회"
 *     description: "Lost Ark API를 호출하여 닉네임에 대한 캐릭터 정보를 반환합니다."
 *     tags: [party]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 description: "캐릭터 닉네임"
 *                 example: "사용자닉네임"
 *     responses:
 *       200:
 *         description: "캐릭터 정보 반환 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 무기레벨:
 *                   type: string
 *                   description: "무기의 레벨 정보"
 *                   example: "1400"
 *                 직업각인:
 *                   type: string
 *                   description: "캐릭터의 직업 각인 정보"
 *                   example: "바드"
 *                 악세목록:
 *                   type: array
 *                   description: "악세사리 옵션 정보"
 *                   items:
 *                     type: string
 *                     example: "치명 200, 특화 300"
 *                 보석:
 *                   type: array
 *                   description: "보석 정보"
 *                   items:
 *                     type: string
 *                     example:
 *                      summary: "보석 1"
 *                      value: "보석 1: 효과 증가"
 *       400:
 *         description: "요청 오류 (닉네임 누락 등)"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: "에러 메시지"
 *                   example: "닉네임이 제공되지 않았습니다."
 *       401:
 *         description: "인증 오류 (토큰 문제)"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: "에러 메시지"
 *                   example: "유효하지 않은 토큰입니다."
 *       404:
 *         description: "클라이언트 ID가 유효하지 않음"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: "에러 메시지"
 *                   example: "유효하지 않은 clientId입니다."
 *       500:
 *         description: "서버 내부 오류"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: "에러 메시지"
 *                   example: "데이터를 가져오는 중 오류가 발생했습니다."
 */
router.post("/", authenticateToken, async (req, res) => {
  const clientId = req.user.clientId; // 인증 미들웨어에서 추출된 값
  const nickname = req.body.nickname;

  if (!nickname) {
    return res.status(400).json({ error: "닉네임이 제공되지 않았습니다." });
  }

  try {
    // API Key 가져오기
    const [rows] = await db.query("SELECT apikey FROM User WHERE clientId = ?", [clientId]);
    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "유효하지 않은 clientId입니다." });
    }
    const apikey = rows[0].apikey;

    // Lost Ark API 호출
    const response = await axios.get(
      `https://developer-lostark.game.onstove.com/armories/characters/${nickname}`,
      {
        headers: {
          accept: "application/json",
          authorization: `Bearer ${apikey}`,
        },
      }
    );

    // 데이터 처리
    const 직업각인 = 직업각인함수(
      JSON.parse(response.data.ArkPassive?.Effects?.[0]?.ToolTip)?.Element_000?.value || ""
    );
    const 무기정보 = 무기레벨추출함수(
      HTML태그제거(
        JSON.parse(response.data.ArmoryEquipment[0]?.Tooltip)?.Element_001?.value?.leftStr2 || ""
      )
    );
    const 악세옵션 = 악세옵션목록분석(response);
    const 보석 = 보석검사(response);

    // 응답 반환
    res.json({
      무기레벨: 무기정보,
      직업각인: 직업각인,
      악세목록: 악세옵션,
      보석: 보석,
    });
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error.message);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "유효하지 않은 토큰입니다." });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "토큰이 만료되었습니다." });
    }

    res.status(500).json({ error: "데이터를 가져오는 중 오류가 발생했습니다." });
  }
});

module.exports = router;
