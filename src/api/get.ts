import { users } from '../users';
import { IncomingMessage, ServerResponse} from 'http';
import { STATUS_CODE, CONTENT_TYPES } from 'types';


 export const getUsers = (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(STATUS_CODE.OK, { 'Content-Type': CONTENT_TYPES.ApplicationJSON });
  res.end(JSON.stringify(users));
}
