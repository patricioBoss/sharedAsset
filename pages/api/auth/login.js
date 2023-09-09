import nc from 'next-connect';
import session from '../../../middleware/ironSession';
import database from '../../../middleware/database';
import { login } from '../../../controllers/auth.controller';

const handler = nc({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end('internal server error');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('route is not found');
  },
  attachParams: true,
})
  .use(session)
  .use(database)
  .post(login);

export default handler;
