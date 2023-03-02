import bcrypt from "bcrypt";
import User from "../models/user.model";
import response from "../apiUtil/reponses";
import sendMail from "../helpers/sendVerificationMail";
import resetPasswordMailTemplate from "../helpers/resetPasswordMailTemplate";
import config from "../config/config";
import { jwtSign } from "../apiUtil/jwt";

export const login = async (req, res) => {
  try {
    const { email } = req.body;
    // validate all the fields
    if (!email || !req.body.password) {
      return res.status(400).json({
        type: "failure",
        message: "Invalid email or password",
      });
    }

    const fetchedUser = await User.findOne({ email }).lean();
    // verify email
    if (!fetchedUser) {
      return res.status(401).json({
        type: "failure",
        message: "Invalid Credentials!",
      });
    } else {
      // check if password match
      const isPasswordMatch = await bcrypt.compare(
        req.body.password,
        fetchedUser.password
      );
      if (!isPasswordMatch) {
        response(res, 401, "Invalid Credentials!");
        return res.status(401).json({
          type: "failure",
          message: "Invalid Credentials!",
        });
      }

      //checking if is not user is verified
      // if (!fetchedUser.isVerified) {
      //   return response(res, 401, 'user is not verified check mail for verification or call support');
      // }

      const { password, ...user } = fetchedUser;
      //setting session when user is verified
      req.session.user = user;
      await req.session.save();

      return response(res, 200, " User retrieved successfully", user);
    }
  } catch (err) {
    console.log(err);
    return response(res, 500, "server error", err.message);
  }
};

export const reset = async (req, res) => {
  try {
    const { email } = req.body;
    // validate all the fields
    if (!email) {
      return res.status(400).json({
        type: "failure",
        message: "Invalid email or password",
      });
    }
    const fetchedUser = await User.findOne({ email }).lean();
    // verify email
    if (!fetchedUser) {
      return res.status(404).json({
        type: "failure",
        message: "No Account Found",
      });
    }
    //create verification token
    const token = await jwtSign({ user: fetchedUser._id }, config.jwtSecret, {
      expiresIn: 60 * 60 * 24,
    });
    let hostname = req.headers.host;
    let verificationLink = `http://${hostname}/reset/${token}`;
    let msg = resetPasswordMailTemplate(
      fetchedUser.firstName,
      verificationLink
    );
    let subject = "Pipsville Reset";
    const sent = await sendMail(msg, subject, fetchedUser.email);
    if (sent) {
      return response(res, 200, " Check Email for reset Link");
    }
    return response(res, 400, " Error sending mail");
  } catch (err) {
    console.log(err);
    return response(res, 500, "server error", err.message);
  }
};

export const updatePassword = async (req, res) => {
  const { _id } = req.profile;
  try {
    const { password } = req.body;
    const hash = await bcrypt.hash(password, config.saltRounds);
    const newDetails = await User.findByIdAndUpdate(_id, {
      password: hash,
    }).lean();
    return response(res, 200, " Password Reset Successful");
  } catch (err) {
    console.log(err);
    return response(res, 500, "server error", err.message);
  }
};

export const logout = async (req, res) => {
  if (req.session.user) {
    await req.session.destroy();
    return response(res, 200, "logged out", null);
  } else {
    return response(res, 400, "no user to log out", null);
  }
};
