// 매핑 데이터
const 직업각인 = {
    '강력한 체술' : '초심',
    b: 2,
    c: 3,
    d: 4,
    e: 5
    // 나머지 46개의 매핑 추가
  };
  
  // 매핑 함수
  function 직업각인함수(value) {
    return 직업각인함수[value] || "Unknown"; // 매핑되지 않은 값은 "Unknown"
  }

  const 보석 = {
    '10레벨 겁화의 보석' : '10겁'
  }
  
  // 함수와 데이터를 내보내기
  module.exports = {
    직업각인함수
  };