const express = require("express");
const router = express.Router();
const axios = require("axios");
const db = require("../config/db"); // 데이터베이스 연결
const { 직업각인함수 } = require("./class");
const { 악세옵션목록분석, 보석검사 } = require("./optionsearch");
const extractClientId = require("../middleware/extractClientId");

// 간단한 로그 요약 함수 (개발환경에서만 로그 출력하도록 할 수도 있음)
const logErrorSummary = (message, indices) => {
  if (indices.length) {
    console.error(`${message}: ${indices.join(', ')}`);
  }
};

/**
 * HTML태그제거 함수  
 * - 입력값이 없거나 문자열이 아닐 경우 "정보없음" 반환  
 * - 태그 제거 결과가 빈 문자열이면 "정보없음" 반환  
 */
const HTML태그제거 = (input) => {
  if (!input || typeof input !== "string") {
      return "정보없음";
  }
  try {
      const result = input.replace(/<[^>]*>/g, "");
      return result && result.trim().length > 0 ? result : "정보없음";
  } catch (error) {
      return "정보없음";
  }
};

const 무기레벨추출함수 = (input) => {
  const match = input.match(/\b\d{4}\b/);
  return match ? match[0] : "정보없음";
};

const 팔찌옵션추출함수 = (input) => {
  if (!input || typeof input !== "string") return "정보없음";
  const regex = /<img.*?>.*?(?=<img|$)/g; // <img> 태그로 시작해서 다음 <img> 태그까지 또는 문자열 끝까지 추출
  const matches = [...input.matchAll(regex)];
  if (!matches.length) return "정보없음";
  return matches.map(match => {
    let text = HTML태그제거(match[0]);
    text = text.replace(/\.([^\d\s])/g, '. $1');
    return text.trim() || "정보없음";
  });
};

const 엘릭서설명정리 = (text) => {
  if (!text) return "정보없음";
  const match = text.match(/^(.*?Lv\.\d+)/);
  return match ? match[0].trim() : text || "정보없음";
};

const 엘릭서추출함수 = (tooltip) => {
  if (!tooltip) return { 엘릭서1: "정보없음", 엘릭서2: "정보없음" };

  let 장비엘릭서;
  if (tooltip.Element_000?.value?.includes("25") || !tooltip.Element_005?.type?.includes("SingleTextBox")) {
    장비엘릭서 = tooltip.Element_009?.value;
  } else {
    장비엘릭서 = tooltip.Element_010?.value;
  }

  return {
    엘릭서1: 엘릭서설명정리(HTML태그제거(장비엘릭서?.Element_000?.contentStr?.Element_000?.contentStr || "")),
    엘릭서2: 엘릭서설명정리(HTML태그제거(장비엘릭서?.Element_000?.contentStr?.Element_001?.contentStr || ""))
  };
};

const 초월추출함수 = (input) => {
  if (!input || typeof input !== "string") return [];
  const regex = /<\/img>\s*(-?\d+\.?\d*)/g;
  const matches = [...input.matchAll(regex)];
  return matches.map(match => match[1]);
};

router.post("/", extractClientId, async (req, res) => {
  const clientId = req.clientId;
  const nickname = req.body.nickname;
  const apikey = req.apikey;

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
    const parts = ['투구', '견장', '상의', '하의', '장갑', '무기'];
    let 초월ErrorIndices = [];
    [1, 5, 2, 3, 4, 0].forEach((i, idx) => {
      const tooltipRaw = response.data.ArmoryEquipment?.[i]?.Tooltip || "{}";
      let 초월값 = 0;
      try {
        const tooltip = JSON.parse(tooltipRaw);
        const 초월 = 초월추출함수(tooltip?.Element_009?.value?.Element_000?.topStr || "");
        if (초월.length > 0) {
          초월값 = 초월[0];
        } else {
          const 초월1 = 초월추출함수(tooltip?.Element_008?.value?.Element_000?.topStr || "");
          if (초월1.length > 0) {
            초월값 = 초월1[0];
          }
        }
      } catch (e) {
        초월값 = "정보없음";
        초월ErrorIndices.push(i);
      }
      초월최종[parts[idx]] = 초월값 || 0;
    });
    // 초월 관련 에러는 요약 로그로 한 번만 남김
    if (초월ErrorIndices.length > 0) {
      console.error(`Error parsing tooltip for indices: ${초월ErrorIndices.join(', ')}`);
    }

    let 엘릭서정보 = {};
    let 엘릭서ErrorIndices = [];
    [1, 5, 2, 3, 4].forEach((i, idx) => {
      const tooltipRaw = response.data.ArmoryEquipment?.[i]?.Tooltip || "{}";
      try {
        const tooltip = JSON.parse(tooltipRaw);
        엘릭서정보[parts[idx]] = 엘릭서추출함수(tooltip);
      } catch (e) {
        엘릭서정보[parts[idx]] = { 엘릭서1: "정보없음", 엘릭서2: "정보없음" };
        엘릭서ErrorIndices.push(i);
      }
    });
    // 만약 모든 엘릭서 부위에서 오류가 발생했다면 한 번만 "엘릭서 없음" 출력
    if (엘릭서ErrorIndices.length === [1, 5, 2, 3, 4].length) {
      console.error("엘릭서 tooltip 파싱 오류: 엘릭서 정보 없음");
    } else if (엘릭서ErrorIndices.length > 0) {
      console.error(`Error parsing 엘릭서 tooltip for indices: ${엘릭서ErrorIndices.join(', ')}`);
    }

    const 팔찌Tooltip = response.data.ArmoryEquipment?.[12]?.Tooltip || "{}";
    let 팔찌;
    try {
      const 팔찌Obj = JSON.parse(팔찌Tooltip);
      팔찌 = 팔찌옵션추출함수(팔찌Obj?.Element_004?.value?.Element_001 || "") || "정보없음";
    } catch (e) {
      팔찌 = "정보없음";
      console.error(`Error parsing 팔찌 tooltip: ${e.message}`);
    }

    const 각인 = [];
    const 각인데이터 = response.data.ArmoryEngraving?.ArkPassiveEffects || [];
    for (let i = 0; i < 5; i++) {
      const 각인상세 = {
        등급: 각인데이터[i]?.Grade || "정보없음",
        등급레벨: 각인데이터[i]?.Level || "정보없음",
        각인이름: 각인데이터[i]?.Name || "정보없음",
        어빌리티스톤레벨: 각인데이터[i]?.AbilityStoneLevel || "정보없음"
      };
      각인.push(각인상세);
    }

    let 고대 = 0;
    let 유물 = 0;
    for (let i = 6; i < 11; i++) {
      const 악세 = response.data.ArmoryEquipment?.[i]?.Grade;
      if (악세 === '고대') { 고대++; }
      if (악세 === '유물') { 유물++; }
    }

    const 포인트 = [];
    const 진화포인트 = response.data.ArkPassive?.Points?.[0]?.Value || "정보없음";
    const 깨달음포인트 = response.data.ArkPassive?.Points?.[1]?.Value || "정보없음";
    const 도약포인트 = response.data.ArkPassive?.Points?.[2]?.Value || "정보없음";
    포인트.push(진화포인트, 깨달음포인트, 도약포인트);

    const 직업각인Raw = response.data.ArkPassive?.Effects?.[0]?.ToolTip || "{}";
    let 직업각인;
    try {
      const 직업각인Obj = JSON.parse(직업각인Raw);
      직업각인 = 직업각인함수(직업각인Obj?.Element_000?.value || "정보없음");
    } catch (e) {
      직업각인 = "정보없음";
      console.error(`Error parsing 직업각인 tooltip: ${e.message}`);
    }

    let 무기정보;
    try {
      const 무기TooltipRaw = response.data.ArmoryEquipment?.[0]?.Tooltip || "{}";
      const 무기TooltipObj = JSON.parse(무기TooltipRaw);
      const 무기LeftStr2 = 무기TooltipObj?.Element_001?.value?.leftStr2 || "";
      무기정보 = 무기레벨추출함수(HTML태그제거(무기LeftStr2));
    } catch (e) {
      무기정보 = "정보없음";
      console.error(`Error parsing 무기 tooltip: ${e.message}`);
    }

    const 악세옵션 = 악세옵션목록분석(response) || "정보없음";
    const 보석 = 보석검사(response) || "정보없음";

    const cartQuery = `
      SELECT b.nickname 
      FROM Cart c 
      JOIN Blacklist b ON c.postId = b.postId
      WHERE c.clientId = ?
    `;
    const [cartNicknames] = await db.query(cartQuery, [clientId]);
    const isBlacklisted = cartNicknames.some((item) => item.nickname === nickname);

    let 무기깡강화, 무기상재;
    try {
      const 무기TooltipRaw = response.data.ArmoryEquipment?.[0]?.Tooltip || "{}";
      const 무기TooltipObj = JSON.parse(무기TooltipRaw);
      무기깡강화 = HTML태그제거(무기TooltipObj?.Element_000?.value || "").match(/\+\d+/)?.[0] || "정보없음";
      무기상재 = HTML태그제거(무기TooltipObj?.Element_005?.value || "").match(/\d+단계/)?.[0] || "정보없음";
    } catch (e) {
      무기깡강화 = "정보없음";
      무기상재 = "정보없음";
      // 에러 로그 출력 부분은 주석 처리할 수 있음.
      // console.error(`Error parsing 무기 강화 tooltip: ${e.message}`);
    }
    const 아이템레벨 = response.data.ArmoryProfile?.ItemMaxLevel
      ? parseFloat(response.data.ArmoryProfile.ItemMaxLevel.replace(/,/g, ""))
      : "정보없음";

    res.json({
      아이템레벨: 아이템레벨,
      무기레벨: 무기정보,
      무기강화: 무기깡강화,
      무기상재: 무기상재,
      직업각인: 직업각인,
      포인트: 포인트,
      초월: 초월최종,
      엘릭서: 엘릭서정보,
      고대악세개수: 고대,
      유물악세개수: 유물,
      악세목록: 악세옵션,
      팔찌: 팔찌,
      보석: 보석,
      각인: 각인,
      블랙리스트포함여부: isBlacklisted
    });
  } catch (error) {
    console.error("API 요청 중 오류 발생: " + error.message);
    res.status(500).json({ error: "데이터를 가져오는 중 오류가 발생했습니다." });
  }
});

module.exports = router;
