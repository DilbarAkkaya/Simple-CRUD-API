import http from 'http';
import { STATUS_CODE, HTTP_METHOD, ENDPOINT } from '../types';
import { createUser, sendResponse, sendMessage, validateID, updateUser, deleteUser } from './functions';
import { users } from '../users';
//import { configDotenv } from 'dotenv';
//import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT;
export const createServer = () => {
  const server = http.createServer((req, res) => {
try {
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
        sendMessage(res, STATUS_CODE.BAD_REQUEST, 'Invalid User Data. Please contain all required fields');
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
              sendMessage(res, STATUS_CODE.BAD_REQUEST, 'Invalid User Data. Please contain all required fields');
            }
          });
        } else {
          sendMessage(res, STATUS_CODE.NOT_FOUND, 'The requested resource was not found');
        }
      }
    }


  } else if (req.method === HTTP_METHOD.DELETE && req.url && req.url.startsWith(`${ENDPOINT}/`)) {
    const urlArray = req.url.split('/');
    const userID = urlArray[1];
    if (!userID) {
      sendMessage(res, STATUS_CODE.NOT_FOUND, 'The requested resource was not found');
    } else {
      const isValidate = validateID(userID);
      if (!isValidate) {
        sendMessage(res, STATUS_CODE.BAD_REQUEST, 'Invalid userId. Please enter a valid uuidv4');
      } else {
        deleteUser(userID);
      }
    }
  }


  else {
    sendMessage(res, STATUS_CODE.NOT_FOUND, 'The requested resource was not found');
  }
} catch(err) {
  sendMessage(res, STATUS_CODE.INTERNAL_SERVER_ERROR, 'Internal server error');
  console.error('Internal server error', err);
}
   
  });
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
