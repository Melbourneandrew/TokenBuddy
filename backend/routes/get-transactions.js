const { verifyJWT } = require("../scripts/tokens.js");
const User = require("../models/UserModel");
const Transaction = require("../models/Transaction");
module.exports = function (router) {
  router.get("/user/transactions", verifyJWT, getTransactions);
};

async function getTransactions(req, res) {
  const clientUsername = res.locals.clientUsername;
  console.log(
    "Transaction list request for: " + clientUsername
  );
  try {
    if (clientUsername == null)
      throw "No username on tx-list request";

    let client = await User.findOne({
      username: clientUsername,
    }).lean();
    if (client == null) throw "No user with that username";
    console.log(client);

    let transactions = await Transaction.find({
      $or: [{ reciever: client._id }, { sender: client._id }],
    }).limit(20).populate('reciever').populate('sender').lean();
    return res
      .status(200)
      .json({ m: "success", txs: transactions });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ e: error });
  }
}
