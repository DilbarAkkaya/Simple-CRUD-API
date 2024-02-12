//import {jest} from '@jest/globals';
import request from 'supertest';
import { createServer } from '../api/server';

describe('endpoint api/users PUT', () => {
  let id: string;
  const server = createServer();

  afterEach(() => {
    server.close();
  });
  test('should get the updated newUser record by its id by GET api/users/{id} request', async () => {
    const newUser = {
      username: 'Petr',
      age:35,
      hobbies: ['art', 'music']
    };
    const resPost= await request(server).post('/api/users').send(newUser).expect(201);
    id = resPost.body.id;
   await request(server).get(`/api/users/${id}`);
    const updatedUser = {
      id: id,
      username: "Anna",
      age: 22,
      hobbies: ['swimming']
    };
    console.log('1:', newUser)
    console.log('2:', updatedUser)

    await request(server).put(`/api/users/${id}`).send(updatedUser).expect(200);
    const resGetAfterPut = await request(server).get(`/api/users/${id}`);
    expect(resGetAfterPut.status).toBe(200);
    console.log('3', resGetAfterPut.body)
    expect(resGetAfterPut.body).toEqual(updatedUser);
  });


});