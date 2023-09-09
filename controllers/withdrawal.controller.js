import response from "../apiUtil/reponses";
import Transaction from "../models/transaction.model";
import Withdrawal from "../models/withdrawal.model";
import User from "../models/user.model";
/**

   { "$inc": { "total": -200 } }

 */

export const makeWithdrawal = async (req, res) => {
  const userId = req.profile._id;
  const currentBalance = req.profile.accountBalance;
  const { amount, currency } = req.body;
  console.log(req.body);

  try {
    // if (parseInt(amount) < 600) {
    //   return response(res, 400, "cannot withdrawl less than 600", null);
    // }
    if (!Object.values(req.profile.wallets).some((x) => x)) {
      return response(res, 404, "wallet not found", null);
    }
    //save user
    const session = await req.db.startSession();
    await session.withTransaction(async () => {
      const transaction = await Transaction.create(
        [
          {
            userId,
            amount: -Number(amount),
            type: "withdrawal",
            currentBalance: Number(currentBalance - amount),
          },
        ],
        { session, new: true }
      );
      const withdrawal = await Withdrawal.create(
        [{ amount, currency, userId, transactionId: transaction[0]._id }],
        {
          session,
          new: true,
        }
      );
      await User.findByIdAndUpdate(
        userId,
        { $inc: { accountBalance: -Number(withdrawal[0].amount) } },
        {
          session,
          new: true,
          runValidators: true,
        }
      );
    });
    await session.commitTransaction();
    session.endSession();

    return response(res, 200, "withdrawal successfully", null);
  } catch (err) {
    return response(res, 500, "server error", err.message);
  }
};

export const approveWithdrawal = async (req, res) => {
  const { _id } = req.withdrawal;
  try {
    await Withdrawal.findByIdAndUpdate(
      _id,
      { status: "paid", approvedDate: Date.now() },
      {
        new: true,
        runValidators: true,
      }
    );
    return response(res, 200, "approved", null);
  } catch (err) {
    return response(res, 500, "server error", err.message);
  }
};

export const getWithdrawalById = async (req, res, next) => {
  const { withdrawId } = req.query;
  try {
    const withdrawal = await Withdrawal.findById(withdrawId);
    req.withdrawal = withdrawal;
    next();
  } catch (err) {
    return response(res, 500, "server error", err.message);
  }
};
