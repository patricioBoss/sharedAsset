import { ironSession } from 'iron-session/express';
import option from '../utils/iron-option';

let session = ironSession(option);

export default session;
