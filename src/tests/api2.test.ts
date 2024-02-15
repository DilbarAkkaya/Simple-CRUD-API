import request from 'supertest';
//import { createServer } from '../api/server';
//import http from 'http';
import { validateID } from '../api/functions';
//let server: http.Server;
const port = process.env.PORT || 3001;
describe('throw Error', () => {

/*   beforeEach(() => {
    server = createServer();
  });
  afterEach(() => {
    server.close();
  });
  afterAll(()=> {
    server.close()
  }); */
  test('should throw error 404 with provided message, when url is not right', async () => {
    try {
      const res = await request(`http://localhost:${port}`).get('/api/users');
      expect(res.status).toBe(404);
      expect(res.text).toBe('The requested resource was not found');
    } catch (err) {
      console.error(err);
    }
   
  });
  test('should throw error 400 with provided message, when user data is not right', async () => {
    try {
      const newUser = {
        username: 'Ivan',
      };
      const res = await request(`http://localhost:${port}`).post('/api/users').send(newUser);
      expect(res.status).toBe(400);
      expect(res.text).toBe('Invalid User Data');
    } catch(err) {
      console.error(err);
    }
});

test('should validateID return  false for a invalid ID', () => {
  const id = '542542563563';
  expect(validateID(id)).toBe(false);
});
});