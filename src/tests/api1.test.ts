//import {jest} from '@jest/globals';
import request from 'supertest';
import { createServer } from '../api/server';
import http from 'http';
//import { User } from 'types';
import { users } from 'users';
//import { v4 as uuidv4 } from 'uuid';

let id: string;
let server: http.Server;
describe('api/users GET', () => {
  server = createServer();
  afterEach(() => {
    server.close();
  });
  test('should GET users from api', async () => {
    const res = await request(server).get('/api/users');
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual(users);
  });

  test('should create a newUser by a POST request', async () => {
    const newUser = {
      username: 'Ivan',
      age:25,
      hobbies: ['basketball', 'music']
    };
    const res = await request(server).post('/api/users').send(newUser);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    //expect(res.body.username).toBe(newUser.username);
   //expect(res.body.age).toBe(newUser.age);
    //expect(res.body.hobbies).toEqual(newUser.hobbies);
    expect(res.body).toMatchObject(newUser);
    id = res.body.id;
    console.log(id, 'kykfhgfhgf');
    console.log(res.body);
  });
  test(`shoul get the created newUser record by its id by GET api/users/{id} request`, async () => {
    const res = await request(server).get(`/api/users/${id}`);
    console.log(id, 'id new user')
   // console.log(res)
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: id,
      username: 'Ivan',
      age: 25,
      hobbies: ['basketball', 'music']
    });
  });
});