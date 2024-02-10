import { users } from '../users';
import { ServerResponse } from 'http';
import { CONTENT_TYPES, User } from '../types';
import { v4 as uuidv4 } from 'uuid';


export const sendResponse = (res: ServerResponse, statusCode: number, data: User | User[] | User["id"]) => {
  res.writeHead(statusCode, { 'Content-Type': CONTENT_TYPES.ApplicationJSON });
  res.end(JSON.stringify(data));
};

export const sendMessage = (res: ServerResponse, statusCode: number, message: string) => {
  res.writeHead(statusCode, { 'Content-Type': CONTENT_TYPES.TextPlain });
  res.end(message);
};

export const createUser = (userReq: User) => {
  const newUser: User = {
    id: uuidv4(),
    username: userReq.username,
    age: userReq.age,
    hobbies: userReq.hobbies,
  }
  users.push(newUser);
  return newUser;
}
export const validateID = (id:string) => {
  const regExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regExp.test(id);
}