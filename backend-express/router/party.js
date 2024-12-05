const express = require("express");
const router = express.Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const db = require("../config/db"); // 데이터베이스 연결
const { 직업각인함수 } = require("./class");
const { 악세옵션목록분석, 보석검사 } = require("./optionsearch");

const HTML태그제거 = (input) => input.replace(/<[^>]*>/g, "");

const 무기레벨추출함수 = (input) => {
  const match = input.match(/\b\d{4}\b/);
  return match ? match[0] : null;
};

router.post("/", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // JWT 토큰 추출

  if (!token) {
    return res.status(401).json({ error: "인증 토큰이 제공되지 않았습니다." });
  }

  try {
    // JWT 토큰 검증 및 유저 정보 추출
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user_id; // 토큰에서 유저 아이디 추출

    // 데이터베이스에서 유저의 API 키 가져오기
    const [rows] = await db.query("SELECT api_key FROM User WHERE user_id = ?", [userId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "유저 정보를 찾을 수 없습니다." });
    }
    const apiKey = rows[0].api_key;

    const { nickname } = req.body;
    if (!nickname) {
      return res.status(400).json({ error: "닉네임이 제공되지 않았습니다." });
    }

    // Lost Ark API 요청
    const response = await axios.get(
      `https://developer-lostark.game.onstove.com/armories/characters/${nickname}`,
      {
        headers: {
          accept: "application/json",
          authorization: apiKey,
        },
      }
    );

    // 필요한 데이터 추출
    const 직업각인 = 직업각인함수(
      JSON.parse(response.data.ArkPassive.Effects[0].ToolTip).Element_000.value
    );
    const 무기정보 = 무기레벨추출함수(
      HTML태그제거(
        JSON.parse(response.data.ArmoryEquipment[0].Tooltip).Element_001.value.leftStr2
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
