const User = require("../models/UserModel");
const Transaction = require("../models/Transaction.js");
const { verifyJWT } = require("../scripts/tokens.js");

module.exports = function (router) {
  router.post("/tx/new", verifyJWT, createTransactionRecord);
};

async function createTransactionRecord(req, res) {
  const senderUsername = res.locals.clientUsername;
  const recieverPubkey = req.body.reciever;
  const tokenMint = req.body.tokenMint;
  const tokenName = req.body.tokenName;
  const tokenAmmount = req.body.tokenAmmount;
  const tokenSymbol = req.body.tokenSymbol;
  const txId = req.body.txId;
  console.log(
    "New tx request for " +
      senderUsername +
      " -> " +
      recieverPubkey
  );
  try {
    if (senderUsername == null)
      throw "No sender username on request";
    if (recieverPubkey == null)
      throw "No reciever pubkey on request";
    if (tokenMint == null) throw "No token mint on request";
    if (tokenName == null) throw "No token name on request";
    if (tokenAmmount == null)
      throw "No token ammount on request";
    if (tokenSymbol == null) throw "No token symbol on request";
    if (txId == null) throw "No transaction id on request";

    const sender = await User.findOne({
      username: senderUsername,
    }).lean();
    const reciever = await User.findOne({
      pubkey: recieverPubkey,
    }).lean();

    if (sender == null) throw "Sending user does not exist";
    //reciever does not have to exist. Users can send to wallets outside token buddy network

    await Transaction.create({
      sender: sender,
      reciever: reciever ?? recieverPubkey,
      tokenMint: tokenMint,
      tokenName: tokenName,
      tokenAmmount: tokenAmmount,
      tokenSymbol: tokenSymbol,
      txId: txId,
    });

    return res.status(200).json({ m: "success" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ e: error });
  }
}
