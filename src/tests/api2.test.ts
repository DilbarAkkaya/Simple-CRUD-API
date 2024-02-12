import request from 'supertest';
import { createServer } from '../api/server';
import http from 'http';
import { validateID } from '../api/functions';
let server: http.Server;
describe('throw Error', () => {

  beforeEach(() => {
    server = createServer();
  });
  afterEach(() => {
    server.close();
  });
  afterAll(() => {
    server.close();
  });
  test('should throw error 404 with provided message, when url is not right', async () => {
    const res = await request(server).get('/api/userss');
    expect(res.status).toBe(404);
    expect(res.text).toBe('The requested resource was not found');
  });
  test('should throw error 400 with provided message, when user data is not right', async () => {
    const newUser = {
      username: 'Ivan',
    };
    const res = await request(server).post('/api/users').send(newUser);
    expect(res.status).toBe(400);
    expect(res.text).toBe('Invalid User Data');
});

test('should validateID return  false for a invalid ID', () => {
  const id = '542542563563';
  expect(validateID(id)).toBe(false);
});
});