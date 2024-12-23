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

const 팔찌옵션추출함수 = (input) => {
  const regex = /<img.*?>.*?(?=<img|$)/g; // <img> 태그로 시작하고 다음 <img> 태그까지 또는 문자열 끝까지 추출
  const matches = [...input.matchAll(regex)]; // 정규식으로 매칭된 결과를 배열로 추출
  return matches.map(match => {
    let text = HTML태그제거(match[0]); // HTML 태그 제거
    text = text.replace(/\.([^\d\s])/g, '. $1'); // '.' 뒤에 숫자가 아닌 경우 공백 추가
    return text.trim(); // 앞뒤 공백 제거
  });
};

const 초월추출함수 = (input) => {
  const regex = /<\/img>\s*(-?\d+\.?\d*)/g; // </img> 뒤의 숫자 추출 (음수와 소수점 포함)
  const matches = [...input.matchAll(regex)];
  return matches.map(match => match[1]); // 매칭된 숫자 부분만 반환
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
  const clientId = req.user.clientId; // 인증 미들웨어에서 추출된 clientId
  const nickname = req.body.nickname;
  const apikey = req.user.apikey;

  if (!nickname) {
    return res.status(400).json({ error: "닉네임이 제공되지 않았습니다." });
  }

  try {
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


    let 초월최종 = {};

    // 장비별 초월 정보 추출
    const parts = ['투구', '견장', '상의', '하의', '장갑', '무기'];
    [1, 5, 2, 3, 4, 0].forEach((i, idx) => {
        const tooltipRaw = response.data.ArmoryEquipment[i]?.Tooltip;
        let 초월값 = 0;
    
        if (tooltipRaw) {
            const tooltip = JSON.parse(tooltipRaw);
            const 초월 = 초월추출함수(tooltip.Element_009?.value?.Element_000?.topStr || "");
    
            if (초월.length > 0) {
                초월값 = 초월[0];
            } else {
                const 초월1 = 초월추출함수(tooltip.Element_008?.value?.Element_000?.topStr || "");
                if (초월1.length > 0) {
                    초월값 = 초월1[0];
                }
            }
        }
    
        초월최종[parts[idx]] = 초월값 || 0;
    });

    //팔찌
    const 팔찌 = 팔찌옵션추출함수(JSON.parse(response.data.ArmoryEquipment[12].Tooltip).Element_004.value.Element_001)

    const 각인 = []

    //각인
    for (i=0; i<5; i++){
      각인상세 = {
          등급 : response.data.ArmoryEngraving.ArkPassiveEffects[i].Grade,
          등급레벨 : response.data.ArmoryEngraving.ArkPassiveEffects[i].Level,
          각인이름 : response.data.ArmoryEngraving.ArkPassiveEffects[i].Name,
          어빌리티스톤레벨 : response.data.ArmoryEngraving.ArkPassiveEffects[i].AbilityStoneLevel
      }
      각인.push(각인상세)
    }

    //악세
    let 고대 = 0;
    let 유물 = 0;
    for (i=6; i<11; i++){
      const 악세 = response.data.ArmoryEquipment[i].Grade
      if(악세 == '고대'){
        고대++
      }
      if(악세 == '유물'){
        유물++
      }
    }
    악세등급 = 고대 , 유물


    //진화 깨달음 도약 포인트
    포인트 = []

    const 진화포인트 = response.data.ArkPassive.Points[0].Value
    const 깨달음포인트 = response.data.ArkPassive.Points[1].Value
    const 도약포인트 = response.data.ArkPassive.Points[2].Value

    포인트.push(진화포인트)
    포인트.push(깨달음포인트)
    포인트.push(도약포인트)

    // Lost Ark API 응답 데이터 처리
    // const 직업각인 = 직업각인함수(
    //   JSON.parse(response.data.ArkPassive?.Effects?.[0]?.ToolTip)?.Element_000?.value || ""
    // );
    const 직업각인 = 직업각인함수(JSON.parse(response.data.ArkPassive?.Effects?.[0]?.ToolTip)?.Element_000?.value || "")
    const 무기정보 = 무기레벨추출함수(
      HTML태그제거(
        JSON.parse(response.data.ArmoryEquipment[0]?.Tooltip)?.Element_001?.value?.leftStr2 || ""
      )
    );
    const 악세옵션 = 악세옵션목록분석(response);
    const 보석 = 보석검사(response);

    // 장바구니의 블랙리스트 글 닉네임 비교
    const cartQuery = `
      SELECT b.nickname 
      FROM Cart c 
      JOIN Blacklist b ON c.postId = b.postId
      WHERE c.clientId = ?
    `;
    const [cartNicknames] = await db.query(cartQuery, [clientId]);

    // 블랙리스트 포함 여부 확인
    const isBlacklisted = cartNicknames.some((item) => item.nickname === nickname);

    // 응답 데이터 반환
    res.json({
      무기레벨: 무기정보,
      직업각인: 직업각인,
      포인트: 포인트,
      초월: 초월최종,
      // 진화포인트: 진화포인트,
      // 깨달음포인트: 깨달음포인트,
      // 도약포인트: 도약포인트,
      고대악세개수: 고대,
      유물악세개수: 유물,
      악세목록: 악세옵션,
      팔찌: 팔찌,
      보석: 보석,
      각인: 각인,
      블랙리스트포함여부: isBlacklisted,
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
