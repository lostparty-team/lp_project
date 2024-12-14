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
