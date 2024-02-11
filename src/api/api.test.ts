//import {jest} from '@jest/globals';
import request  from 'supertest';
import  { createServer } from './server';

describe('Implemented endpoint api/users GET', () => {
  let server  = createServer();
  afterAll(() => {
    server.close();
  });
  test('should return an empty array', async () => {
    //const server  = createServer();
    const res = await request(server).get('/api/users');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});