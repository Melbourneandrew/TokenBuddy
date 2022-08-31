const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const TOKEN_HASH = process.env.JWT_SECRET_KEY;
const { generateMessage, verifyMessage } = require("../scripts/messages.js");

module.exports = function (router) {
  router.post("/user/request-token", requestToken);
  router.post("/user/retrieve-token", issueToken);
};

async function requestToken(req, res) {
  const clientPubkey = req.body.clientPubkey;
  console.log("Login request for " + clientPubkey);
  try {
    if (clientPubkey == null) throw "No key with request";
    let client = await User.findOne({ pubkey: clientPubkey });
    if (client == null) throw "No user with that pubkey found";

    const message = generateMessage();
    client.message = message;
    await client.save();
    return res.status(200).json({ message: message});
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e: e });
  }
}

async function issueToken(req, res) {
  const clientPubkey = req.body.clientPubkey;
  const signature = req.body.signature;
  
  console.log("Verifying wallet " + clientPubkey + " to issue token");

  try {
    if (clientPubkey == null) throw "No pubkey in request";
    if (signature == null) throw "No signature in request";

    let client = await User.findOne({ pubkey: clientPubkey });
    const message = client.message;
    //generate new message to prevent vulnerabilities
    client.message = generateMessage();
    await client.save();

    const signatureVerified = verifyMessage(
      message,
      signature,
      clientPubkey
    );

    if (!signatureVerified) throw "Signature could not be verified";
    
    let data = {
        time: Date,
        username: client.username,
    };
    const token = jwt.sign(data, TOKEN_HASH);

    return res.status(200).json({ token: token, user: client.toObject() });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e: e });
  }
}
