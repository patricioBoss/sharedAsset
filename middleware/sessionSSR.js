import { withIronSessionSsr } from 'iron-session/next';
import sessionOptions from '../utils/iron-option';

export function withSessionSsr(handler) {
  return withIronSessionSsr(handler, sessionOptions);
}
