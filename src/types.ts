export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

export enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
};

export enum STATUS_CODE {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  CREATED = 201,
  NO_CONTENT = 204
};

export enum CONTENT_TYPES {
  TextPlain = 'text/plain',
  ApplicationJSON = 'application/json',
}
export const ENDPOINT = '/api/users';
export const PORT = 3000;