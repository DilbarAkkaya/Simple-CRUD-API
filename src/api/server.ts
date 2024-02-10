import http from 'http';
import { STATUS_CODE, HTTP_METHOD, ENDPOINT, PORT } from '../types';
import { createUser, sendResponse, sendMessage, validateID, updateUser } from './functions';
import { users } from '../users';
//import { v4 as uuidv4 } from 'uuid';

export const createServer = () => {
  const server = http.createServer((req, res) => {
    if (req.method === HTTP_METHOD.GET && req.url === ENDPOINT) {
      sendResponse(res, STATUS_CODE.OK, users);
    } else if (req.method === HTTP_METHOD.GET && req.url && req.url.startsWith(`${ENDPOINT}/`)) {
      const urlArray = req.url.split('/');
      const userID = urlArray[1];
      if (!userID) {
        sendMessage(res, STATUS_CODE.NOT_FOUND, 'The requested resource was not found');
      } else {
        const isValidate = validateID(userID);
        if (!isValidate) {
          sendMessage(res, STATUS_CODE.BAD_REQUEST, 'Invalid userId. Please enter a valid uuidv4');
        } else {
          const user = users.find((item) => {
            return item.id === userID;
          });
          if (user) {
            sendResponse(res, STATUS_CODE.OK, user);
          } else {
            sendMessage(res, STATUS_CODE.NOT_FOUND, 'The requested resource was not found');
          }
        }
      }
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
          sendMessage(res, STATUS_CODE.BAD_REQUEST, 'Invalid User Data. Please contain all required fields"');
        }
      })
    } else if (req.method === HTTP_METHOD.PUT && req.url && req.url.startsWith(`${ENDPOINT}/`)) {
      const urlArray = req.url.split('/');
      const userID = urlArray[1];
      if (!userID) {
        sendMessage(res, STATUS_CODE.NOT_FOUND, 'The requested resource was not found');
      } else {
        const isValidate = validateID(userID);
        if (!isValidate) {
          sendMessage(res, STATUS_CODE.BAD_REQUEST, 'Invalid userId. Please enter a valid uuidv4');
        } else {
          const user = users.find((item) => {
            return item.id === userID;
          });
          if (user) {
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', () => {
              try {
              const updatedUser = JSON.parse(body);
              updateUser(updatedUser.id, updatedUser);
              sendResponse(res, STATUS_CODE.OK, updatedUser);
              } catch (err) {
                sendMessage(res, STATUS_CODE.BAD_REQUEST, 'Invalid data');
              }
            });
          } else {
            sendMessage(res, STATUS_CODE.NOT_FOUND, 'The requested resource was not found');
          }
        }
      }
    }
    else {
      sendMessage(res, STATUS_CODE.NOT_FOUND, 'The requested resource was not found');
    }
  });
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
