//import {jest} from '@jest/globals';
import request from 'supertest';
//import { createServer } from '../api/server';
//import http from 'http';
//import { User } from 'types';
import { users } from 'users';
//import { v4 as uuidv4 } from 'uuid';
const port = process.env.PORT || 4000;
console.log(process.env)
let id: string;
// let server: http.Server;
describe('api/users GET', () => {
 /*  server = createServer();
  afterEach(() => {
    server.close();
  });
  afterAll(()=>{
    server.close();
  }) */
  test('should GET users from api', async () => {
    try {
      const res = await request(`http://localhost:${port}`).get('/api/users');
      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual(users);
    }
  catch (err) {
    console.error(err)
  }
  });

  test('should create a newUser by a POST request', async () => {
    try {
      const newUser = {
        username: 'Ivan',
        age:25,
        hobbies: ['basketball', 'music']
      };
      const res = await request(`http://localhost:${port}`).post('/api/users').send(newUser);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      
    //expect(res.body.username).toBe(newUser.username);
   //expect(res.body.age).toBe(newUser.age);
    //expect(res.body.hobbies).toEqual(newUser.hobbies);
    expect(res.body).toMatchObject(newUser);
    id = res.body.id;
    console.log(id, 'kykfhgfhgf');
    console.log(res.body);
    }catch(err){
      console.error(err)
    }
  });
  test(`shoul get the created newUser record by its id by GET api/users/{id} request`, async () => {
    try{
      const res = await request(`http://localhost:${port}`).get(`/api/users/${id}`);
      console.log(id, 'id new user')
     // console.log(res)
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        id: id,
        username: 'Ivan',
        age: 25,
        hobbies: ['basketball', 'music']
      });

    }catch(err){
      console.error(err)
    }
  });
});