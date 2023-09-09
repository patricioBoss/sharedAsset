import nc from 'next-connect';
import { sendPublicMails } from '../../controllers/user.controller';
import database from '../../middleware/database';
// import session from '../../../middleware/ironSession';

const handler = nc({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end('Something broke!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  },
  attachParams: true,
})
  .use(database)
  .post(sendPublicMails);

export default handler;
