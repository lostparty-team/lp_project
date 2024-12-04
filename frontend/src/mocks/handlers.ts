import { http, HttpResponse } from 'msw';

const baseURL = 'http://localhost:3030';

export const handlers = [
  http.post(`${baseURL}/api/signup`, () => {
    return HttpResponse.json({ status: 200 });
  }),
  http.post(`${baseURL}/api/check-id`, () => {
    return new HttpResponse(null, {
      status: 200,
    });
  }),
  http.post(`${baseURL}/api/login`, () => {
    return HttpResponse.json(
      {
        id: 'id',
        password: 'pw',
        status: 200,
      },
      {
        headers: {
          Authorization: 'testToken',
          sex: 'test',
        },
      },
    );
  }),
  http.post(`${baseURL}/api/blacklist`, () => {
    return HttpResponse.json({
      firstName: 'test',
    });
  }),
  http.post(`${baseURL}/api/party`, () => {
    return HttpResponse.json({
      firstName: 'test',
    });
  }),
  http.post(`${baseURL}/api/test`, () => {
    return HttpResponse.json({
      firstName: 'test',
    });
  }),
];
