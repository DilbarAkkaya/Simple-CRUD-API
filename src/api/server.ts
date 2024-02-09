import http from 'http';
import { STATUS_CODE, HTTP_METHOD, ENDPOINT, PORT } from '../types';
import { getUsers, sendMessage } from './functions';

export const createServer = () => {
  const server = http.createServer((req, res) => {
    if (req.method === HTTP_METHOD.GET && req.url === ENDPOINT) {
      getUsers(res);
    } else {
      sendMessage(res, STATUS_CODE.NOT_FOUND, 'The requested resource was not found');
    }
  });
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
