import { http, HttpResponse } from 'msw';

import numberProblem from '@/mocks/numberProblem.json';
import situationProblem from '@/mocks/situationProblem.json';

const { VITE_USER_NAME, VITE_USER_PASSWORD } = import.meta.env;

export const handlers = [
  // 로그인 요청
  http.post('/login', async ({ request }) => {
    const userData = await request.formData();

    const userId = userData.get('userId');
    const userPassword = userData.get('userPassword');

    if (userId === VITE_USER_NAME && userPassword === VITE_USER_PASSWORD) {
      return HttpResponse.json({
        name: '허지연',
      });
    } else {
      return HttpResponse.error();
    }
  }),
  // 문제 데이터 요청
  http.get('/problem/:gameType', ({ params }) => {
    const { gameType } = params;

    switch (gameType) {
      case 'number-game':
        return HttpResponse.json(numberProblem);
        break;
      case 'situation-game':
        return HttpResponse.json(situationProblem);
        break;

      default:
        break;
    }

    return HttpResponse.error();
  }),
];
