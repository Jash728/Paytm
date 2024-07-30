const { Account } = require("../db");

const getBalance = async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  res.json({
    balance: account.balance,
  });
};

const transferAmount = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { to, amount } = req.body;
  

  const account = await Account.findOne({
    userId: req.userId,
  }).session(session);

  if (account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({
    userId: to,
  }).session(session);


  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  await Account.updateOne(
    {
      userId: req.userId,
    },

    {
      $inc: {
        balance: -amount,
      },
    }
  ).session(session);

  await Account.updateOne(
    {
      userId: to,
    },

    {
      $inc: {
        balance: amount,
      },
    }
  ).session(session);

  await session.commitTransaction();
  res.json({
    message: "Transfer successful",
  });
};

module.exports = { getBalance, transferAmount };
