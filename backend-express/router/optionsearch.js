// 옵션 목록 정의
const 상특옵목록 = ["추가 피해 +1.60%", "공격력 +390"];
const 상공용목록 = ["방어력 +250"];
const 중특옵목록 = ["무기 공격력 +480"];
const 중공용목록 = ["공격 속도 +5%"];
const 하특옵목록 = ["치명타 확률 +3%"];
const 하공용목록 = ["최대 생명력 +10%"];

// 모든 목록을 배열에 담아 관리
const 옵션목록 = [
    { 이름: "상특옵개수", 목록: 상특옵목록 },
    { 이름: "상공용개수", 목록: 상공용목록 },
    { 이름: "중특옵개수", 목록: 중특옵목록 },
    { 이름: "중공용개수", 목록: 중공용목록 },
    { 이름: "하특옵개수", 목록: 하특옵목록 },
    { 이름: "하공용개수", 목록: 하공용목록 },
];

// ↓ 어떤 악세를 장착하고 있는지 분류
function 악세옵션목록분석(response) {
    const 결과 = {};

    for (let 옵션 of 옵션목록) {
        let count = 0;

        // ArmoryEquipment 인덱스 6, 7을 순회하며 옵션 포함 여부 확인
        for (let index = 6; index < 10; index++) {
            try {
                const 데이터 = JSON.parse(response.data.ArmoryEquipment[index].Tooltip).Element_005.value.Element_001;

                // 옵션 목록에 있는 단어를 순회하며 포함 여부 확인
                for (let 단어 of 옵션.목록) {
                    if (데이터.includes(단어)) {
                        count += 1;
                    }
                }
            } catch (error) {
                console.error(`Error parsing index ${index}:`, error.message);
            }
        }

        // 결과 저장
        결과[옵션.이름] = count;
    }

    return 결과;
}

// ↓ 어떤 보석을 장착하고 있는지 분류
function 보석검사(response) {
    const 결과 = {}; // 결과를 저장할 객체

    try {
        // 보석 데이터 순회
        const 보석목록 = response.data.ArmoryGem.Gems; // 보석 배열
        보석목록.forEach(gem => {
            const 데이터 = JSON.parse(gem.Tooltip).Element_000.value; // 보석 데이터

            // 보석 레벨과 종류 추출 (예: "7레벨 겁화")
            const match = 데이터.match(/(\d+)레벨\s(겁화|작열|멸화|홍염)/); // 정규식으로 레벨과 종류 추출
            if (match) {
                const 레벨 = match[1]; // 보석 레벨
                const 종류 = match[2]; // 보석 종류
                const key = `${레벨}레벨 ${종류}`; // 결과 키 (예: "7레벨 겁화")

                // 결과 객체에 보석 개수 추가
                if (!결과[key]) {
                    결과[key] = 0;
                }
                결과[key] += 1;
            }
        });
    } catch (error) {
        console.error("Error parsing gem data:", error.message);
    }

    return 결과;
}

module.exports = { 악세옵션목록분석, 보석검사 };
