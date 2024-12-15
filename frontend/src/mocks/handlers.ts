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
  http.get(`${baseURL}/api/blacklist/:id`, async (id) => {
    await delay(200);
    return HttpResponse.json({
      message: '블랙리스트 세부 정보를 성공적으로 조회했습니다.',
      post: {
        id: 777,
        title: '악성 유저 리스트',
        author: '정의의수호자',
      },
      data: [
        {
          nickname: '트롤러123',
          reason: '고의적인 팀 방해 행위',
        },
        {
          nickname: '트롤러123',
          reason: '고의적인 팀 방해 행위',
        },
        {
          nickname: '트롤러123',
          reason: '고의적인 팀 방해 행위',
        },
      ],
    });
  }),

  // blacklist 생성
  http.post(`${baseURL}/api/blacklist/create`, async () => {
    await delay(200);
    return new HttpResponse(null, { status: 200 });
  }),

  // blacklist 삭제
  http.delete(`${baseURL}/api/blacklist`, async () => {
    await delay(500);
    return new HttpResponse(null, { status: 200 });
  }),
];
