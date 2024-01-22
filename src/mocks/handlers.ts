import { http, HttpResponse } from 'msw';

const { VITE_USER_NAME, VITE_USER_PASSWORD } = import.meta.env;

export const handlers = [
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
];
