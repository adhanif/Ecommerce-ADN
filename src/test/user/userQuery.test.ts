import store from '../../redux/store';
import { userQueries } from '../../redux/userQuery';
import { mockUsersData } from '../shared/mockData';
import { userServer } from '../shared/userServer';

beforeAll(() => {
  userServer.listen();
});

afterAll(() => {
  userServer.close();
});

describe('User Query', () => {
  //Register a new user
  test('should Register successfully', async () => {
    const response = await store.dispatch(
      userQueries.endpoints.registerUser.initiate({
        name: 'Nicolas',
        email: 'nico@gmail.com',
        password: '1234',
        avatar: 'https://picsum.photos/800',
      }),
    );
    if ('data' in response) {
      expect(response.data).toHaveProperty('id', '4');
    }
  });

  //login successfull
  test('should login successfully', async () => {
    const response = await store.dispatch(
      userQueries.endpoints.loginUser.initiate({
        email: 'dani@gmail.com',
        password: '123456',
      }),
    );
    if ('data' in response) {
      expect(response.data).toHaveProperty('access_token');
    }
  });

  // login failed
  test('should login failed', async () => {
    const response = await store.dispatch(
      userQueries.endpoints.loginUser.initiate({
        email: 'dani@gmail.com',
        password: '1234567',
      }),
    );
    if ('error' in response) {
      expect(response.error).toHaveProperty('status', 401);
    }
  });

  //get user Profile
  test('should get user Profile', async () => {
    const validAccessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY3Mjc2NjAyOCwiZXhwIjoxNjc0NDk0MDI4fQ.kCak9sLJr74frSRVQp0_27BY4iBCgQSmoT3vQVWKzJg';

    const response = await store.dispatch(
      userQueries.endpoints.userProfile.initiate({
        access_token: validAccessToken,
      }),
    );
    if ('data' in response) {
      expect(response.data).toHaveProperty('email', 'dani@gmail.com');
    }
  });
});
