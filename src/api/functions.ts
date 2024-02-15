import { users } from '../users';
import { ServerResponse } from 'http';
import { CONTENT_TYPES, User, STATUS_CODE } from '../types';
import { v4 as uuidv4 } from 'uuid';


export const sendResponse = (res: ServerResponse, statusCode: number, data: User | User[] | User["id"] | undefined) => {
  if (data === undefined) {
    res.writeHead(STATUS_CODE.NOT_FOUND, { 'Content-Type': CONTENT_TYPES.TextPlain });
    res.end('Resource not found');
  } else {
    res.writeHead(statusCode, { 'Content-Type': CONTENT_TYPES.ApplicationJSON });
    res.end(JSON.stringify(data));
  }
};

export const sendMessage = (res: ServerResponse, statusCode: number, message: string) => {
  res.writeHead(statusCode, { 'Content-Type': CONTENT_TYPES.TextPlain });
  res.end(message);
};

export const createUser = (userReq: User, arr: User[]) => {
  if (!userReq.username || !userReq.age || !userReq.hobbies) {
    throw new Error(' Please contain all required fields');
  }
  const id = uuidv4();
  const newUser: User = {
    id: id,
    username: userReq.username,
    age: userReq.age,
    hobbies: userReq.hobbies,
  }
 arr.push(newUser);
  return  newUser;
}
export const updateUser = (userID: string, updatedUser: User, arr: User[]) => {
  const indexUserForUpdating = arr.findIndex(item => item.id === userID);
  if (indexUserForUpdating == -1) {
    return undefined;
  } else {
    users[indexUserForUpdating] = { ...users[indexUserForUpdating], ...updatedUser };
    return users[indexUserForUpdating];
  }
}
export const deleteUser = (userID: string, arr: User[]): User | undefined => {
  const userIndex = arr.findIndex(item => item.id === userID);
if(userIndex !== -1) {
  const deletedUser = arr.splice(userIndex, 1)[0];
  return deletedUser;
}else {

  throw new Error('User is not founded');
}
}

export const validateID = (id: string) => {
  const regExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regExp.test(id);
}