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
export const updateUser = (userID: string, updatedUser: User) => {
  const indexUserForUpdating = users.findIndex(item => item.id === userID);
  if (indexUserForUpdating == -1) {
    return undefined;
  } else {
    users[indexUserForUpdating] = { ...users[indexUserForUpdating], ...updatedUser };
    return users[indexUserForUpdating];
  }
}
export const deleteUser = (userID: string) => {
  const userForRemove = users.find(item => item.id === userID);
  if (!userForRemove) {
    return false;
  } else {
    const indexUserForRemove = users.indexOf(userForRemove);
    users.splice(indexUserForRemove, 1);
    return true;
  }
}

export const validateID = (id: string) => {
  const regExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regExp.test(id);
}