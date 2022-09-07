const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  reciever: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  tokenMint: {
    type: String,
  },
  tokenName: {
    type: String,
  },
  tokenAmmount: {
    type: String,
  },
  tokenSymbol: {
    type:String,
  },
  txId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Transaction", TransactionSchema);
