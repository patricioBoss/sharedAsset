import nc from 'next-connect';
import { attachProfileById } from '../../../../controllers/user.controller';
import { updatePassword } from '../../../../controllers/user.controller';
import database from '../../../../middleware/database';

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
  .use(attachProfileById)
  .post(updatePassword);

export default handler;
