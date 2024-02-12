//import {jest} from '@jest/globals';
import request from 'supertest';
//import { createServer } from '../api/server';
const port = process.env.PORT || 3001;
describe('endpoint api/users PUT', () => {
  let id: string;
  //const server = createServer();

/*   afterEach(() => {
    server.close();
  });
  afterAll(()=>{
    server.close();
  }); */
  test('should get the updated newUser record by its id by GET api/users/{id} request', async () => {
try {
  const newUser = {
    username: 'Petr',
    age:35,
    hobbies: ['art', 'music']
  };
  const resPost= await request(`http://localhost:${port}`).post('/api/users').send(newUser).expect(201);
  id = resPost.body.id;
 await request(`http://localhost:${port}`).get(`/api/users/${id}`);
  const updatedUser = {
    id: id,
    username: "Anna",
    age: 22,
    hobbies: ['swimming']
  };
  console.log('1:', newUser)
  console.log('2:', updatedUser)

  await request(`http://localhost:${port}`).put(`/api/users/${id}`).send(updatedUser).expect(200);
  const resGetAfterPut = await request(`http://localhost:${port}`).get(`/api/users/${id}`);
  expect(resGetAfterPut.status).toBe(200);
  console.log('3', resGetAfterPut.body)
  expect(resGetAfterPut.body).toEqual(updatedUser);

} catch(err) {
  console.error(err);
}
});


});