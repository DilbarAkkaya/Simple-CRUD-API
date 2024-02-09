import { users } from '../users';
import { ServerResponse } from 'http';
import { STATUS_CODE, CONTENT_TYPES, User } from '../types';


export const getUsers = (res: ServerResponse) => {
  res.writeHead(STATUS_CODE.OK, { 'Content-Type': CONTENT_TYPES.ApplicationJSON });
  res.end(JSON.stringify(users));
}

export const sendMessage = (res: ServerResponse, status: number, message: string) => {
  res.writeHead(status, { 'Content-Type': CONTENT_TYPES.TextPlain });
  res.end(message);
};

export const createUser = (userReq: User) => {
  const newUser: User = {
    id: userReq.id,
    username: userReq.username,
    age: userReq.age,
    hobbies: userReq.hobbies,
  }
  users.push(newUser);
  return newUser;
}