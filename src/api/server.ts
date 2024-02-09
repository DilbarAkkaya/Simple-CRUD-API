import http from 'http';
import { STATUS_CODE, CONTENT_TYPES, HTTP_METHOD, ENDPOINT, PORT } from 'types';
import { getUsers } from './functions';

const server = http.createServer((req, res) => {
  if (req.method === HTTP_METHOD.GET && req.url === ENDPOINT) {
    getUsers(req, res);
  } else {
    res.writeHead(STATUS_CODE.NOT_FOUND, { 'Content-Type': CONTENT_TYPES.TextPlain });
    res.end('Not Found');
  }
});
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})