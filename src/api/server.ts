import http from 'http';
import { STATUS_CODE, HTTP_METHOD, ENDPOINT, PORT } from '../types';
import { createUser, sendResponse, sendMessage } from './functions';
import { users } from 'users';

export const createServer = () => {
  const server = http.createServer((req, res) => {
    if (req.method === HTTP_METHOD.GET && req.url === ENDPOINT) {
      sendResponse(res, STATUS_CODE.OK, users);
    } else if (req.method === HTTP_METHOD.POST && req.url === ENDPOINT) {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        try {
          const parsedUser = JSON.parse(body);
          const newUser = createUser(parsedUser);
          sendResponse(res, STATUS_CODE.CREATED, newUser);
        } catch (err) {
          sendMessage(res, STATUS_CODE.BAD_REQUEST, 'Invalid User Data');
        }
      })
    } else {
      sendMessage(res, STATUS_CODE.NOT_FOUND, 'The requested resource was not found');
    }
  });
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
