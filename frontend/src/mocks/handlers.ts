import { delay, http, HttpResponse } from 'msw';

const baseURL = 'http://localhost:3030';

// register
export const handlers = [
  http.post(`${baseURL}/register`, () => {
    return HttpResponse.json({ status: 200 });
  }),

  // check-id
  http.post(`${baseURL}/check-id`, async () => {
    await delay(500);
    return new HttpResponse(null, { status: 200 });
  }),

  // login
  http.post(`${baseURL}/login`, () => {
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
  http.get(`${baseURL}/blacklist`, async (title) => {
    const time = new Date().toLocaleDateString();
    await delay(200);
    return HttpResponse.json([
      {
        title: '개트롤 팀원 모음집',
        author: '트롤러123',
        time,
      },
      {
        title: '비매너짓 골라서 하는 애들 팩',
        author: '게임왕국',
        time,
      },
      {
        title: '아이템 훔쳐가는 친구들',
        author: '픽셀마스터',
        time,
      },
      {
        title: '욕설로 가득한 채팅방',
        author: '신의손',
        time,
      },
      {
        title: '게임 규칙을 무시하는 사람들',
        author: '무법자A',
        time,
      },
      {
        title: '고의적인 패배 유도하는 팀원',
        author: '패배전문가',
        time,
      },
      {
        title: '비매너 플레이로 불이익 받는 경우',
        author: '불운의사나이',
        time,
      },
      {
        title: '팀워크를 해치는 행동들',
        author: '혼자놀기왕',
        time,
      },
      {
        title: '게임 내 사기꾼 리스트',
        author: '사기꾼퇴치단',
        time,
      },
      {
        title: '불법 프로그램 사용 의심자들',
        author: '핵쟁이잡는사람',
        time,
      },
    ]);
  }),

  // blacklist 상세 조회
  http.get(`${baseURL}/blacklist/:title`, async () => {
    await delay(200);
    return HttpResponse.json({
      title: '개트롤 모음집',
      author: '트롤수집가',
      blacklist: [
        {
          nickname: '하늘빛',
          reason: '게임 중 상대방에게 욕설을 퍼부름.',
        },
        {
          nickname: '별빛',
          reason: '팀원에게 비매너 행동으로 게임을 방해함.',
        },
        {
          nickname: '바람소리',
          reason: '상대 팀을 비하하는 발언을 지속적으로 함.',
        },
        {
          nickname: '푸른숲',
          reason: '게임 중 고의로 팀킬을 시도함.',
        },
        {
          nickname: '달빛',
          reason: '게임 진행 중 불필요한 폭언을 함.',
        },
        {
          nickname: '비오는날',
          reason: '패배 후 팀원에게 책임을 전가함.',
        },
        {
          nickname: '햇살',
          reason: '상대방의 플레이를 조롱하며 비하함.',
        },
        {
          nickname: '눈꽃',
          reason: '게임 도중 고의로 방해하여 팀의 승리를 저해함.',
        },
        {
          nickname: '소나무',
          reason: '비매너 채팅으로 다른 유저들을 불쾌하게 만듦.',
        },
        {
          nickname: '미소천사',
          reason: "'노잼'이라고 비하하며 게임 분위기를 망침.",
        },
        {
          nickname: '꿈꾸는자',
          reason: "'이런 게임은 처음'이라며 불만을 쏟아냄.",
        },
        {
          nickname: '여행자',
          reason: "'너무 못한다'며 팀원을 비난함.",
        },
        {
          nickname: '음악사랑',
          reason: "'이런 쓰레기 같은 게임'이라고 욕설을 함.",
        },
        {
          nickname: '책벌레',
          reason: "'너 혼자서 해봐라'며 팀원에게 무시 발언을 함.",
        },
        {
          nickname: '운동왕',
          reason: "'왜 이렇게 못해?'라며 지속적인 비난을 함.",
        },
        {
          nickname: '요리사',
          reason: "'이런 조합은 진짜 아니다'라며 팀 전략을 무시함.",
        },
        {
          nickname: '게임러',
          reason: "'이 게임은 쓰레기다'라고 부정적인 발언을 반복함.",
        },
        {
          nickname: '사진사',
          reason: "'다들 왜 이렇게 못해?'라며 팀원들을 조롱함.",
        },
        {
          nickname: '영화광',
          reason: "'진짜 이건 아니지?'라며 상대방을 비하함.",
        },
        {
          nickname: '애니메이션팬',
          reason: "'이런 상황에서 왜 이러냐'며 불만을 토로함.",
        },
        {
          nickname: '피아노마스터',
          reason: "'너 때문에 진다'며 팀원을 탓함.",
        },
      ],
    });
  }),

  // blacklist 생성
  http.post(`${baseURL}/blacklist`, async () => {
    await delay(200);
    return new HttpResponse(null, { status: 200 });
  }),

  // blacklist 삭제
  http.delete(`${baseURL}/blacklist`, async () => {
    await delay(500);
    return new HttpResponse(null, { status: 200 });
  }),
];
