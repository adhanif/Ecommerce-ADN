import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { UserLogin, UserProfileData, UserRegister } from '../../misc/types';
import { mockToken, mockUsersData } from './mockData';

export const handler = [
  // login
  http.post(
    'https://api.escuelajs.co/api/v1/auth/login',
    async ({ request }) => {
      const { email, password } = (await request.json()) as UserLogin;

      const alreadyUser = mockUsersData.find(
        (user) => user.email === email && user.password === password,
      );

      if (alreadyUser) {
        return HttpResponse.json(mockToken, { status: 200 });
      } else return HttpResponse.json(null, { status: 401 });
    },
  ),

  //register
  http.post('https://api.escuelajs.co/api/v1/users/', async ({ request }) => {
    const registerUser = (await request.json()) as UserRegister;

    return HttpResponse.json({ ...registerUser, id: '4' });
  }),

  //get user Profile
  http.get(
    'https://api.escuelajs.co/api/v1/auth/profile',
    async ({ request }) => {
      //   const response = (await request.json()) as UserProfileData;
      const token = request.headers.get('Authorization')?.split(' ')[1];

      if (token === mockToken.access_token) {
        return HttpResponse.json(mockUsersData[0], { status: 200 });
      }
    },
  ),
];

export const userServer = setupServer(...handler);
