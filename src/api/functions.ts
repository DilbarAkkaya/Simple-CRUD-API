import { users } from '../users';
import { ServerResponse } from 'http';
import { CONTENT_TYPES, User } from '../types';


export const sendResponse = (res: ServerResponse, statusCode: number, data: User | User[] ) => {
  res.writeHead(statusCode, { 'Content-Type': CONTENT_TYPES.ApplicationJSON });
  res.end(JSON.stringify(data));
}

export const sendMessage = (res: ServerResponse, statusCode: number, message: string) => {
  res.writeHead(statusCode, { 'Content-Type': CONTENT_TYPES.TextPlain });
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