import { withSessionSsr } from "./sessionSSR";
import User from "../models/user.model";
import dbConnect from "../utils/dbConnect";

function pageAuth(handler) {
  return withSessionSsr(async (context) => {
    if (context.req.session.user) {
      await dbConnect();
      const userId = context.req.session.user._id;
      const user = await User.findById(userId)
        .select(["-password", "-createdAt", "-updatedAt"])
        .lean();
      context.req.user = user;
      return handler(context);
    } else {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
        props: {},
      };
    }
  });
}
export default pageAuth;
