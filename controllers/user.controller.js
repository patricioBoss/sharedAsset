import response from "../apiUtil/reponses";
import { jwtSign } from "../apiUtil/jwt";
import User from "../models/user.model";
import config from "../config/config";
import Transaction from "../models/transaction.model";
import sendMail from "../helpers/sendVerificationMail";
import bcrypt from "bcrypt";
import emailTemplate from "../helpers/emailTemplate";
import sampleMailTemplate from "../helpers/sampleMailTemplate";
import welcomeMail from "../helpers/welcomeMail";

export const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    return response(res, 200, "fetched users successfully", allUsers);
  } catch (err) {
    return res.status(500).json({
      type: "failure",
      message: "Server Error!",
    });
  }
};

export const createUser = async (req, res) => {
  const userData = req.body;
  //check if user email exist
  // return response(res, 200, 'User with email Already Exist!', userData);

  const fetchedUser = await User.findOne({ email: userData.email });
  if (fetchedUser) {
    return response(res, 400, "User with email Already Exist!");
  }
  //delete confirm passeord
  delete userData.confirmPassword;
  try {
    const hash = await bcrypt.hash(userData.password, config.saltRounds);
    userData.password = hash;
    //save user
    const user = new User(userData);
    const savedUser = await user.save();
    //create verification token
    const token = await jwtSign({ user: savedUser._id }, config.jwtSecret, {
      expiresIn: "30 days",
    });
    let hostname = req.headers.host;
    let loginLink = `http://${hostname}/login`;
    let msg = welcomeMail(userData.firstname, loginLink);
    const sent = await sendMail(msg, "Welcome to SharedAsset", userData.email);
    console.log(sent);
    if (sent) {
      return res.status(200).json({
        type: "success",
        message: "Successfully signed up!",
      });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      type: "failure",
      message: err.message,
    });
  }
};

export const getUserById = async (req, res) => {
  const { userId } = req.query;
  try {
    const user = await User.findById(userId)
      .select(["-password", "-createdAt", "-updatedAt"])
      .lean();
    if (!user) {
      return response(res, 404, "User not found", null);
    } else {
      return response(res, 200, " User retrieved successfully", user);
    }
  } catch (err) {
    return response(res, 500, "server error", err.message);
  }
};

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  try {
    let fetchedUser = await User.findOne({ _id: userId });

    if (!fetchedUser) {
      res.status(404).json({
        type: "failure",
        message: "User not found",
      });
    }
    fetchedUser = await User.findByIdAndUpdate({ _id: userId }, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      type: "success",
      message: "User updated Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      type: "failure",
      message: "Internal Server error",
      error: err.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    let fetchedUser = await User.findOne({ _id: userId });

    if (!fetchedUser) {
      return res.status(404).json({
        type: "failure",
        message: "User not found",
      });
    } else {
      const deletedUser = await User.deleteOne({ _id: userId });

      if (deletedUser) {
        response(res, 200, "user deleted successfully", null);
      }
    }
  } catch (err) {
    response(res);
    res.status(500).json({
      type: "failure",
      message: "Internal Server error",
      error: err.message,
    });
  }
};

export const attachProfileById = async (req, res, next) => {
  const { userId } = req.query;
  // console.log('this is the userId', userId);
  try {
    const user = await User.findById(userId).select(["-password"]).exec();
    if (!user) {
      return response(res, 404, "User not found", null);
    } else {
      req.profile = user;
      next();
    }
  } catch (err) {
    return response(res, 500, "server error", err.message);
  }
};

//verification middleware
export const checkUserVerification = async (req, res, next) => {
  const { isVerified } = req.profile;
  if (!isVerified) {
    return response(res, 400, "user is not verified", null);
  } else {
    next();
  }
};

export const verify = async (req, res) => {
  try {
    //get picture from files
    const { _id } = req.profile;
    await User.findOneAndUpdate({ _id }, { isVerified: true });

    return response(res, 200, "verification successful", null);
  } catch (err) {
    console.log(err);
    return response(res, 500, err.message, null);
  }
};

export const redemBonus = async (req, res) => {
  const userId = req.profile._id;
  console.log(userId);
  const bonus = req.body.bonus;
  const currentBalance = req.profile.accountBalance;
  const currentBonus = req.profile.bonus;
  if (bonus !== currentBonus) {
    return response(res, 404, "bonus not present");
  }

  try {
    //save user
    const session = await req.db.startSession();
    await session.withTransaction(async () => {
      await Transaction.create(
        [
          {
            userId,
            amount: Number(bonus),
            type: "bonus",
            currentBalance: Number(currentBalance + bonus),
          },
        ],
        { session, new: true }
      );
      await User.findByIdAndUpdate(
        userId,
        { $inc: { accountBalance: Number(bonus), bonus: -Number(bonus) } },

        {
          session,
          new: true,
          runValidators: true,
        }
      );
    });
    await session.commitTransaction();
    session.endSession();

    return response(res, 200, "bonus redemed successfull", null);
  } catch (err) {
    return response(res, 500, "server error", err.message);
  }
};

export const addBonus = async (req, res) => {
  const userId = req.profile._id;
  const bonus = req.body.bonus;

  try {
    await User.findByIdAndUpdate(
      userId,
      { $inc: { bonus: Number(bonus) } },
      {
        new: true,
        runValidators: true,
      }
    );

    return response(res, 200, "bonus added successfull", null);
  } catch (err) {
    return response(res, 500, "server error", err.message);
  }
};

export const updateWallet = async (req, res) => {
  const { _id } = req.profile;
  try {
    await User.findByIdAndUpdate(
      { _id },
      { wallets: req.body },
      {
        new: true,
        runValidators: true,
      }
    );
    return response(res, 200, "wallet updated successfully", null);
  } catch (err) {
    return response(res, 500, "server error", err.message);
  }
};

export const updatePassword = async (req, res) => {
  const { _id } = req.profile;
  try {
    const { newPassword, oldPassword } = req.body;
    // validate all the fields

    const fetchedUser = await User.findById(_id).lean();

    // check if password match
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      fetchedUser.password
    );
    if (!isPasswordMatch) {
      return response(res, 401, "invalid old password");
    } else {
      const hash = await bcrypt.hash(newPassword, config.saltRounds);
      const newDetails = await User.findByIdAndUpdate(
        _id,
        { password: hash },
        { new: true }
      ).lean();

      const { password, ...user } = newDetails;
      return response(res, 200, " User retrieved successfully", user);
    }
  } catch (err) {
    console.log(err);
    return response(res, 500, "server error", err.message);
  }
};

export const sendPublicMails = async (req, res) => {
  const { message, subject, email } = req.body;
  console.log({ message, subject, email });
  const fetchedUser = await User.findOne({ email });
  if (!fetchedUser) {
    return response(
      res,
      404,
      `User with this email doesn't exist in the database`
    );
  }
  console.log({ fetchedUser });
  let msg = sampleMailTemplate(fetchedUser.firstName, message);
  try {
    const sent = await sendMail(msg, subject, email);
    console.log(sent);
    if (sent) {
      return res.status(200).json({
        type: "success",
        message: "mail sent successfully",
      });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({
      type: "failure",
      message: err.message,
    });
  }
};
