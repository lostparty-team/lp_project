import { delay, http, HttpResponse } from 'msw';

const baseURL = 'http://localhost:3030';

// register
export const handlers = [
  http.post(`${baseURL}/api/register`, () => {
    return HttpResponse.json({ status: 200 });
  }),

  // check-id
  http.post(`${baseURL}/api/check-id`, async () => {
    await delay(500);
    return new HttpResponse(null, { status: 200 });
  }),

  // login
  http.post(`${baseURL}/api/login`, () => {
    const mockJwtToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    return HttpResponse.json(
      {
        status: 200,
        user: {
          id: 'test',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${mockJwtToken}`,
        },
      },
    );
  }),

  // blacklist 목록
  http.get(`${baseURL}/api/blacklist`, async () => {
    await delay(200);
    return HttpResponse.json([
      {
        id: 1,
        title: '개트롤 팀원 모음집',
        author: '트롤러123',
      },
      {
        id: 2,
        title: '비매너짓 골라서 하는 애들 팩',
        author: '게임왕국',
      },
      {
        id: 3,
        title: '아이템 훔쳐가는 친구들',
        author: '픽셀마스터',
      },
      {
        id: 4,
        title: '욕설로 가득한 채팅방',
        author: '신의손',
      },
      {
        id: 5,
        title: '게임 규칙을 무시하는 사람들',
        author: '무법자A',
      },
      {
        id: 6,
        title: '고의적인 패배 유도하는 팀원',
        author: '패배전문가',
      },
      {
        id: 7,
        title: '비매너 플레이로 불이익 받는 경우',
        author: '불운의사나이',
      },
      {
        id: 8,
        title: '팀워크를 해치는 행동들',
        author: '혼자놀기왕',
      },
      {
        id: 9,
        title: '게임 내 사기꾼 리스트',
        author: '사기꾼퇴치단',
      },
      {
        id: 10,
        title: '불법 프로그램 사용 의심자들',
        author: '핵쟁이잡는사람',
      },
      {
        id: 11,
        title: '게임 중 잠수타는 플레이어들',
        author: '잠수부헌터',
      },
      {
        id: 12,
        title: '상대방 조롱하는 비매너 유저',
        author: '예의바른시민',
      },
      {
        id: 13,
        title: '고의적으로 팀 분위기 망치는 사람들',
        author: '팀워크지킴이',
      },
      {
        id: 14,
        title: '게임 내 버그 악용하는 유저들',
        author: '버그버스터즈',
      },
      {
        id: 15,
        title: '음성채팅으로 괴롭히는 플레이어',
        author: '조용한게이머',
      },
      {
        id: 16,
        title: '게임 중 탈주하는 유저 모음',
        author: '끝까지간다',
      },
      {
        id: 17,
        title: '상대방 실수 조롱하는 비매너',
        author: '따뜻한마음',
      },
      {
        id: 18,
        title: '팀 킬 일삼는 유저들',
        author: '팀워크수호자',
      },
      {
        id: 19,
        title: '게임 내 괴롭힘 사례 모음',
        author: '평화주의자',
      },
      {
        id: 20,
        title: '비매너 플레이어 신고 가이드',
        author: '정의의사도',
      },
      {
        id: 21,
        title: '게임 내 언어폭력 사례',
        author: '말조심하세요',
      },
      {
        id: 22,
        title: '고의적인 게임 지연 행위자들',
        author: '시간은금',
      },
      {
        id: 23,
        title: '부적절한 닉네임 사용자 목록',
        author: '닉네임경찰',
      },
      {
        id: 24,
        title: '게임 내 성희롱 행위 신고',
        author: '존중과배려',
      },
      {
        id: 25,
        title: '비매너 플레이어 회피 꿀팁',
        author: '평화로운게임',
      },
      {
        id: 26,
        title: '게임 내 차별 행위 사례',
        author: '평등한세상',
      },
      {
        id: 27,
        title: '고의적인 팀 방해 행위자',
        author: '팀플레이어',
      },
      {
        id: 28,
        title: '게임 내 사칭 행위 주의보',
        author: '진실만말해요',
      },
      {
        id: 29,
        title: '비매너 플레이어 교육 프로그램',
        author: '매너스쿨장',
      },
      {
        id: 30,
        title: '게임 에티켓 위반 사례집',
        author: '예의바른게이머',
      },
      {
        id: 31,
        title: '고의적인 패배 유도하는 유저',
        author: '패배전문가2',
      },
      {
        id: 32,
        title: '상대방을 괴롭히는 행동',
        author: '괴롭힘전문가',
      },
      {
        id: 33,
        title: '팀워크를 해치는 유저',
        author: '혼자놀기왕2',
      },
      {
        id: 34,
        title: '불법 프로그램 사용 의심자',
        author: '핵쟁이잡는사람2',
      },
      {
        id: 35,
        title: '게임 중 불법 거래하는 유저',
        author: '거래금지',
      },
      {
        id: 36,
        title: '상대방을 조롱하는 유저',
        author: '조롱꾼',
      },
      {
        id: 37,
        title: '고의적인 게임 방해 행위자',
        author: '방해꾼',
      },
      {
        id: 38,
        title: '비매너 채팅 사용자',
        author: '채팅지킴이',
      },
      {
        id: 39,
        title: '팀킬 일삼는 유저',
        author: '팀킬러',
      },
      {
        id: 40,
        title: '불법 프로그램 사용 의심자',
        author: '핵쟁이잡는사람3',
      },
      {
        id: 41,
        title: '비매너 플레이어 신고 리스트',
        author: '신고전문가',
      },
      {
        id: 42,
        title: '상대방을 괴롭히는 행동',
        author: '괴롭힘전문가2',
      },
      {
        id: 43,
        title: '고의적인 게임 방해 행위자',
        author: '방해꾼2',
      },
      {
        id: 44,
        title: '비매너 채팅 사용자',
        author: '채팅지킴이2',
      },
      {
        id: 45,
        title: '팀킬 전문 유저',
        author: '팀킬러2',
      },
      {
        id: 46,
        title: '불법 거래 의심 사용자',
        author: '거래금지2',
      },
      {
        id: 47,
        title: '고의적인 패배 유도하는 팀원',
        author: '패배전문가3',
      },
      {
        id: 48,
        title: '상대방을 조롱하는 비매너 플레이어',
        author: '조롱꾼2',
      },
      {
        id: 49,
        title: '비매너 플레이어 신고 가이드',
        author: '정의로운게이머',
      },
      {
        id: 50,
        title: '게임 내 언어폭력 사례 모음',
        author: '말조심하세요2',
      },
      {
        id: 51,
        title: '비매너 플레이어 교육 자료',
        author: '교육자료제작소',
      },
      {
        id: 52,
        title: '상대방에게 욕설하는 유저',
        author: '욕설감시단',
      },
      {
        id: 53,
        title: '고의적으로 게임 방해하는 유저',
        author: '방해전문가',
      },
      {
        id: 54,
        title: '비매너 채팅 사용자',
        author: '채팅관리자',
      },
      {
        id: 55,
        title: '팀킬 전문 유저',
        author: '팀킬러3',
      },
      {
        id: 56,
        title: '불법 거래 의심 사용자',
        author: '거래금지3',
      },
      {
        id: 57,
        title: '고의적인 패배 유도하는 팀원',
        author: '패배전문가4',
      },
      {
        id: 58,
        title: '상대방을 조롱하는 비매너 플레이어',
        author: '조롱꾼3',
      },
      {
        id: 59,
        title: '비매너 플레이어 신고 가이드',
        author: '정의로운게이머2',
      },
      {
        id: 60,
        title: '게임 내 언어폭력 사례 모음',
        author: '말조심하세요3',
      },
      {
        id: 61,
        title: '고의적인 게임 방해 행위자',
        author: '방해꾼3',
      },
      {
        id: 62,
        title: '비매너 채팅 사용자',
        author: '채팅지킴이3',
      },
      {
        id: 63,
        title: '팀킬 일삼는 유저',
        author: '팀킬러4',
      },
      {
        id: 64,
        title: '불법 프로그램 사용 의심자',
        author: '핵쟁이잡는사람4',
      },
      {
        id: 65,
        title: '비매너 플레이어 교육 자료',
        author: '교육자료제작소2',
      },
      {
        id: 66,
        title: '상대방에게 욕설하는 유저',
        author: '욕설감시단2',
      },
      {
        id: 67,
        title: '고의적으로 게임 방해하는 유저',
        author: '방해전문가2',
      },
      {
        id: 68,
        title: '비매너 채팅 사용자',
        author: '채팅관리자2',
      },
      {
        id: 69,
        title: '팀킬 전문 유저',
        author: '팀킬러5',
      },
      {
        id: 70,
        title: '불법 거래 의심 사용자',
        author: '거래금지4',
      },
      {
        id: 71,
        title: '고의적인 패배 유도하는 팀원',
        author: '패배전문가5',
      },
      {
        id: 72,
        title: '상대방을 조롱하는 비매너 플레이어',
        author: '조롱꾼4',
      },
      {
        id: 73,
        title: '비매너 플레이어 신고 가이드',
        author: '정의로운게이머3',
      },
      {
        id: 74,
        title: '게임 내 언어폭력 사례 모음',
        author: '말조심하세요4',
      },
      {
        id: 75,
        title: '고의적인 게임 방해 행위자',
        author: '방해꾼4',
      },
      {
        id: 76,
        title: '비매너 채팅 사용자',
        author: '채팅지킴이4',
      },
      {
        id: 77,
        title: '팀킬 일삼는 유저',
        author: '팀킬러6',
      },
      {
        id: 78,
        title: '불법 프로그램 사용 의심자',
        author: '핵쟁이잡는사람5',
      },
      {
        id: 79,
        title: '비매너 플레이어 교육 자료',
        author: '교육자료제작소3',
      },
      {
        id: 80,
        title: '상대방에게 욕설하는 유저',
        author: '욕설감시단3',
      },
      {
        id: 81,
        title: '고의적으로 게임 방해하는 유저',
        author: '방해전문가3',
      },
      {
        id: 82,
        title: '비매너 채팅 사용자',
        author: '채팅관리자3',
      },
      {
        id: 83,
        title: '팀킬 전문 유저',
        author: '팀킬러7',
      },
      {
        id: 84,
        title: '불법 거래 의심 사용자',
        author: '거래금지5',
      },
      {
        id: 85,
        title: '고의적인 패배 유도하는 팀원',
        author: '패배전문가6',
      },
      {
        id: 86,
        title: '상대방을 조롱하는 비매너 플레이어',
        author: '조롱꾼5',
      },
      {
        id: 87,
        title: '비매너 플레이어 신고 가이드 ',
        author: '정의로운게이머4 ',
      },
      {
        id: 88,
        title: '게임 내 언어폭력 사례 모음 ',
        author: '말조심하세요5 ',
      },
      {
        id: 89,
        title: '고의적인 게임 방해 행위자 ',
        author: '방해꾼5 ',
      },
      {
        id: 90,
        title: '비매너 채팅 사용자 ',
        author: '채팅지킴이5 ',
      },
      {
        id: 91,
        title: '팀킬 일삼는 유저 ',
        author: '팀킬러8 ',
      },
      {
        id: 92,
        title: '불법 프로그램 사용 의심자 ',
        author: '핵쟁이잡는사람6 ',
      },
      {
        id: 93,
        title: '비매너 플레이어 교육 자료 ',
        author: '교육자료제작소4 ',
      },
      {
        id: 94,
        title: '상대방에게 욕설하는 유저 ',
        author: '욕설감시단4 ',
      },
      {
        id: 95,
        title: '고의적으로 게임 방해하는 유저 ',
        author: '방해전문가4 ',
      },
      {
        id: 96,
        title: '비매너 채팅 사용자 ',
        author: '채팅관리자4 ',
      },
      {
        id: 97,
        title: '팀킬 전문 유저 ',
        author: '팀킬러9 ',
      },
      {
        id: 98,
        title: '불법 거래 의심 사용자 ',
        author: '거래금지6 ',
      },
      {
        id: 99,
        title: '고의적인 패배 유도하는 팀원 ',
        author: '패배전문가7 ',
      },
      {
        id: 100,
        title: '상대방을 조롱하는 비매너 플레이어 ',
        author: '조롱꾼6 ',
      },
    ]);
  }),

  // blacklist 상세 조회
  http.get(`${baseURL}/api/blacklist/:id`, async ({ params }) => {
    await delay(200);
    const { id } = params;

    const mockData = {
      '1': {
        title: '개트롤 팀원 모음집',
        author: '트롤러123',
        data: [
          { nickname: '트롤맨', reason: '고의적인 팀 방해 행위' },
          { nickname: '게임망치기장인', reason: '아군 골대 자책' },
          { nickname: '트롤링고수', reason: '고의적 팀 분위기 저해' },
        ],
      },
      '2': {
        title: '비매너짓 골라서 하는 애들 팩',
        author: '게임왕국',
        data: [
          { nickname: '욕설마스터', reason: '과도한 욕설 및 비하' },
          { nickname: '분탕질러', reason: '의도적인 게임 던지기' },
          { nickname: '비매너왕', reason: '팀원 사기 저하 행위' },
        ],
      },
      '3': {
        title: '아이템 훔쳐가는 친구들',
        author: '픽셀마스터',
        data: [
          { nickname: '아이템도둑', reason: '팀원 아이템 강탈' },
          { nickname: '황금손', reason: '타인의 아이템 착취' },
          { nickname: '도둑질장인', reason: '아이템 독점 및 방해' },
        ],
      },
      '4': {
        title: '욕설로 가득한 채팅방',
        author: '신의손',
        data: [
          { nickname: '욕설킹', reason: '심한 비속어 사용' },
          { nickname: '채팅테러', reason: '과도한 도배' },
          { nickname: '분위기파괴자', reason: '부적절한 언어 사용' },
        ],
      },
      '5': {
        title: '게임 규칙을 무시하는 사람들',
        author: '무법자A',
        data: [
          { nickname: '규칙파괴자', reason: '게임 규칙 위반' },
          { nickname: '무법자B', reason: '팀 규칙 무시' },
          { nickname: '반칙왕', reason: '불공정 플레이' },
        ],
      },
      '6': {
        title: '고의적인 패배 유도하는 팀원',
        author: '패배전문가',
        data: [
          { nickname: '던지기장인', reason: '고의적 패배 유도' },
          { nickname: '팀워크파괴자', reason: '팀 사기 저하' },
          { nickname: '패배유도러', reason: '소극적 플레이' },
        ],
      },
      '7': {
        title: '비매너 플레이로 불이익 받는 경우',
        author: '불운의사나이',
        data: [
          { nickname: '비매너플레이어', reason: '타인 게임 방해' },
          { nickname: '팀킬러', reason: '아군 공격' },
          { nickname: '방해꾼', reason: '게임 진행 방해' },
        ],
      },
      '8': {
        title: '팀워크를 해치는 행동들',
        author: '혼자놀기왕',
        data: [
          { nickname: '솔로플레이어', reason: '팀 협동 거부' },
          { nickname: '개인주의자', reason: '팀 전략 무시' },
          { nickname: '비협조자', reason: '소통 거부' },
        ],
      },
      '9': {
        title: '게임 내 사기꾼 리스트',
        author: '사기꾼퇴치단',
        data: [
          { nickname: '사기꾼A', reason: '아이템 사기' },
          { nickname: '계정도둑', reason: '계정 해킹 시도' },
          { nickname: '사기전문가', reason: '허위 거래' },
        ],
      },
      '10': {
        title: '불법 프로그램 사용 의심자들',
        author: '핵쟁이잡는사람',
        data: [
          { nickname: '핵의심자', reason: '비정상적 플레이' },
          { nickname: '오토매크로', reason: '자동 프로그램 사용' },
          { nickname: '치트유저', reason: '게임 핵 사용' },
        ],
      },
      '11': {
        title: '게임 중 잠수타는 플레이어들',
        author: '잠수부헌터',
        data: [
          { nickname: '잠수왕', reason: '무단 이탈' },
          { nickname: '잠수전문가', reason: '장시간 방치' },
          { nickname: 'AFK마스터', reason: '게임 중 잠수' },
        ],
      },
      '12': {
        title: '상대방 조롱하는 비매너 유저',
        author: '예의바른시민',
        data: [
          { nickname: '조롱러', reason: '상대방 비하' },
          { nickname: '비웃음장인', reason: '과도한 조롱' },
          { nickname: '도발러', reason: '불필요한 도발' },
        ],
      },
      '13': {
        title: '고의적으로 팀 분위기 망치는 사람들',
        author: '팀워크지킴이',
        data: [
          { nickname: '분위기파괴자', reason: '팀 사기 저하' },
          { nickname: '불화조장러', reason: '팀원 간 갈등 유발' },
          { nickname: '독설가', reason: '과도한 비난' },
        ],
      },
      '14': {
        title: '게임 내 버그 악용하는 유저들',
        author: '버그버스터즈',
        data: [
          { nickname: '버그악용러', reason: '게임 버그 악용' },
          { nickname: '글리치헌터', reason: '버그 지속 사용' },
          { nickname: '익스플로잇마스터', reason: '시스템 취약점 악용' },
        ],
      },
      '15': {
        title: '음성채팅으로 괴롭히는 플레이어',
        author: '조용한게이머',
        data: [
          { nickname: '소음제조기', reason: '과도한 소음 발생' },
          { nickname: '마이크테러', reason: '부적절한 음성 채팅' },
          { nickname: '괴성맨', reason: '고의적 음성 방해' },
        ],
      },
      '16': {
        title: '게임 중 탈주하는 유저 모음',
        author: '끝까지간다',
        data: [
          { nickname: '탈주러', reason: '무단 게임 이탈' },
          { nickname: '도망자', reason: '게임 중 접속 종료' },
          { nickname: '포기왕', reason: '조기 항복 선언' },
        ],
      },
      '17': {
        title: '상대방 실수 조롱하는 비매너',
        author: '따뜻한마음',
        data: [
          { nickname: '조롱마스터', reason: '상대방 실수 비하' },
          { nickname: '비웃음왕', reason: '과도한 조롱' },
          { nickname: '모욕러', reason: '상대방 능력 폄하' },
        ],
      },
      '18': {
        title: '팀 킬 일삼는 유저들',
        author: '팀워크수호자',
        data: [
          { nickname: '팀킬러', reason: '고의적 팀원 공격' },
          { nickname: '아군살해자', reason: '아군 사살' },
          { nickname: '배신자', reason: '팀 내 배신 행위' },
        ],
      },
      '19': {
        title: '게임 내 괴롭힘 사례 모음',
        author: '평화주의자',
        data: [
          { nickname: '괴롭힘전문가', reason: '지속적 괴롭힘' },
          { nickname: '스토커', reason: '특정 플레이어 집중 공격' },
          { nickname: '따돌림왕', reason: '팀원 따돌림' },
        ],
      },
      '20': {
        title: '비매너 플레이어 신고 가이드',
        author: '정의의사도',
        data: [
          { nickname: '신고의달인', reason: '과도한 허위 신고' },
          { nickname: '신고남용자', reason: '부적절한 신고 행위' },
          { nickname: '무고의명수', reason: '근거 없는 신고' },
        ],
      },
      '21': {
        title: '게임 내 언어폭력 사례',
        author: '말조심하세요',
        data: [
          { nickname: '욕설장인', reason: '과도한 비속어 사용' },
          { nickname: '언어폭력러', reason: '공격적 언어 사용' },
          { nickname: '비하의달인', reason: '상대방 비하 발언' },
        ],
      },
      '22': {
        title: '고의적인 게임 지연 행위자들',
        author: '시간은금',
        data: [
          { nickname: '시간낭비러', reason: '고의적 게임 지연' },
          { nickname: '지연의달인', reason: '불필요한 시간 끌기' },
          { nickname: '느림보', reason: '의도적 느린 플레이' },
        ],
      },
      '23': {
        title: '부적절한 닉네임 사용자 목록',
        author: '닉네임경찰',
        data: [
          { nickname: '욕설닉네임', reason: '부적절한 닉네임 사용' },
          { nickname: '성인용닉네임', reason: '성인 콘텐츠 연상 닉네임' },
          { nickname: '차별적닉네임', reason: '차별적 의미의 닉네임' },
        ],
      },
      '24': {
        title: '게임 내 성희롱 행위 신고',
        author: '존중과배려',
        data: [
          { nickname: '성희롱러', reason: '부적절한 성적 발언' },
          { nickname: '성차별자', reason: '성차별적 언행' },
          { nickname: '불쾌한농담러', reason: '성적 농담 남발' },
        ],
      },
      '25': {
        title: '비매너 플레이어 회피 꿀팁',
        author: '평화로운게임',
        data: [
          { nickname: '트롤회피전문가', reason: '과도한 플레이어 차단' },
          { nickname: '블랙리스트장인', reason: '무분별한 플레이어 차단' },
          { nickname: '고립주의자', reason: '소통 거부' },
        ],
      },
      '26': {
        title: '게임 내 차별 행위 사례',
        author: '평등한세상',
        data: [
          { nickname: '인종차별자', reason: '인종차별적 발언' },
          { nickname: '성차별주의자', reason: '성차별적 행동' },
          { nickname: '편견의화신', reason: '특정 그룹 비하' },
        ],
      },
      '27': {
        title: '고의적인 팀 방해 행위자',
        author: '팀플레이어',
        data: [
          { nickname: '사보타지전문가', reason: '고의적 팀 방해' },
          { nickname: '팀워크파괴자', reason: '팀 전략 무시' },
          { nickname: '독고다이', reason: '개인행동 고집' },
        ],
      },
      '28': {
        title: '게임 내 사칭 행위 주의보',
        author: '진실만말해요',
        data: [
          { nickname: '사칭전문가', reason: '타인 사칭' },
          { nickname: '가짜개발자', reason: '개발자 사칭' },
          { nickname: '허위정보유포자', reason: '거짓 정보 전파' },
        ],
      },
      '29': {
        title: '비매너 플레이어 교육 프로그램',
        author: '매너스쿨장',
        data: [
          { nickname: '반성없는자', reason: '지속적 비매너 행위' },
          { nickname: '학습거부자', reason: '매너 교육 거부' },
          { nickname: '재범전문가', reason: '반복적 비매너 행위' },
        ],
      },
      '30': {
        title: '게임 에티켓 위반 사례집',
        author: '예의바른게이머',
        data: [
          { nickname: '에티켓파괴자', reason: '기본 예의 무시' },
          { nickname: '무례한플레이어', reason: '타인 존중 부족' },
          { nickname: '비협조적게이머', reason: '팀 협력 거부' },
        ],
      },
    };

    const defaultData = {
      title: `${id}번 블랙리스트`,
      author: '정의의수호자',
      data: [
        { nickname: '기본유저1', reason: '비매너 행위' },
        { nickname: '기본유저2', reason: '게임 방해' },
        { nickname: '기본유저3', reason: '부적절한 채팅' },
      ],
    };

    const responseData = mockData[id as keyof typeof mockData] || defaultData;

    return HttpResponse.json({
      message: '블랙리스트 세부 정보를 성공적으로 조회했습니다.',
      post: {
        id,
        ...responseData,
      },
      data: responseData.data,
    });
  }),

  // blacklist 생성
  http.post(`${baseURL}/api/blacklist/create`, async () => {
    await delay(200);
    return new HttpResponse(null, { status: 200 });
  }),

  // blacklist 삭제
  http.delete(`${baseURL}/api/blacklist/:id`, async ({ params }) => {
    const { id } = params;
    await delay(300);
    return new HttpResponse(null, { status: 200 });
  }),
];
