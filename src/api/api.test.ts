//import {jest} from '@jest/globals';
import request from 'supertest';
import { createServer } from './server';
import http from 'http';
//import { v4 as uuidv4 } from 'uuid';
let server: http.Server;
///const id = uuidv4();
describe('Implemented endpoint api/users GET', () => {
  beforeEach(() => {
    server = createServer();
  });
  afterEach(() => {
    server.close();
  });
  test('should return an empty array', async () => {
    const res = await request(server).get('/api/users');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('should create a newUser by a POST request', async () => {
    const newUser = {
      username: 'Ivan',
      age:25,
      hobbies: ['basketball', 'music']
    };
    const res = await request(server).post('/api/users').send(newUser);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(newUser);
  });
});