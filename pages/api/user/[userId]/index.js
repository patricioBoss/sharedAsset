import nc from "next-connect";
import {
  getUserById,
  updateUser,
  deleteUser,
  checkUserVerification,
} from "../../../../controllers/user.controller";
import database from "../../../../middleware/database";

const handler = nc({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end("internal server error");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("route is not found");
  },
  attachParams: true,
})
  .use(database)
  .get(getUserById)
  .use(checkUserVerification)
  .post(updateUser)
  .delete(deleteUser);

export default handler;
