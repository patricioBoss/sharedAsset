import nc from "next-connect";
import {
  attachProfileById,
  verify,
} from "../../../../controllers/user.controller";
import database from "../../../../middleware/database";
// import session from '../../../middleware/ironSession';

const handler = nc({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
  attachParams: true,
})
  .use(database)
  .use(attachProfileById)
  .get(verify);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
