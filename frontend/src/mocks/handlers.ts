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
    ]);
  }),

  // blacklist 상세 조회
  http.get(`${baseURL}/api/blacklist`, async () => {
    await delay(200);
    return HttpResponse.json([
      {
        message: '블랙리스트 세부 정보를 성공적으로 조회했습니다.',
        post: {
          id: 1,
          title: '악성 유저 리스트',
          author: '정의의수호자',
        },
        data: [
          {
            nickname: '트롤러123',
            reason: '고의적인 팀 방해 행위',
          },
        ],
      },
      {
        message: '블랙리스트 세부 정보를 성공적으로 조회했습니다.',
        post: {
          id: 2,
          title: '비매너 플레이어 모음',
          author: '매너지킴이',
        },
        data: [
          {
            nickname: '욕설왕123',
            reason: '과도한 욕설 사용',
          },
        ],
      },
      {
        message: '블랙리스트 세부 정보를 성공적으로 조회했습니다.',
        post: {
          id: 3,
          title: '아이템 도둑 명단',
          author: '아이템수호대',
        },
        data: [
          {
            nickname: '아이템강탈자',
            reason: '팀원 아이템 무단 사용',
          },
        ],
      },
      {
        message: '블랙리스트 세부 정보를 성공적으로 조회했습니다.',
        post: {
          id: 4,
          title: '채팅 테러리스트',
          author: '평화주의자',
        },
        data: [
          {
            nickname: '도배마스터',
            reason: '채팅창 도배 및 방해',
          },
        ],
      },
      {
        message: '블랙리스트 세부 정보를 성공적으로 조회했습니다.',
        post: {
          id: 5,
          title: '규칙 위반자 목록',
          author: '규칙준수자',
        },
        data: [
          {
            nickname: '규칙무시남',
            reason: '게임 규칙 지속적 위반',
          },
        ],
      },
      {
        message: '블랙리스트 세부 정보를 성공적으로 조회했습니다.',
        post: {
          id: 6,
          title: '고의적 패배 유도자',
          author: '승리추구자',
        },
        data: [
          {
            nickname: '패배유도맨',
            reason: '의도적인 팀 패배 유도',
          },
        ],
      },
      {
        message: '블랙리스트 세부 정보를 성공적으로 조회했습니다.',
        post: {
          id: 7,
          title: '비매너 행위 사례집',
          author: '매너지킴이2',
        },
        data: [
          {
            nickname: '비매너플레이어',
            reason: '지속적인 비매너 행위',
          },
        ],
      },
      {
        message: '블랙리스트 세부 정보를 성공적으로 조회했습니다.',
        post: {
          id: 8,
          title: '팀워크 방해 행위자',
          author: '팀워크챔피언',
        },
        data: [
          {
            nickname: '솔로플레이어',
            reason: '팀 협력 거부 및 방해',
          },
        ],
      },
      {
        message: '블랙리스트 세부 정보를 성공적으로 조회했습니다.',
        post: {
          id: 9,
          title: '게임 내 사기 행위자',
          author: '정직한게이머',
        },
        data: [
          {
            nickname: '사기꾼123',
            reason: '아이템 거래 사기',
          },
        ],
      },
      {
        message: '블랙리스트 세부 정보를 성공적으로 조회했습니다.',
        post: {
          id: 10,
          title: '불법 프로그램 사용자',
          author: '공정한플레이어',
        },
        data: [
          {
            nickname: '핵쓰는해커',
            reason: '불법 프로그램 사용 의심',
          },
        ],
      },
    ]);
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
