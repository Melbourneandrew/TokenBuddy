const User = require("../models/user.js");
const {
  generateMessage,
  verifyMessage,
} = require("../scripts/messages.js");

module.exports = function (router) {
  router.post("/user/request-new", requestSignup);
  router.post("/user/create-new", completeSignup);
};

async function requestSignup(req, res) {
  const clientPubkey = req.body.clientPubkey;
  const username = req.body.username;
  console.log("Signup request for " + clientPubkey);
  try {
    if (clientPubkey == null) throw "No key with request";
    //check that there isn't already a user with that pubkey]
    let existingUser = await User.findOne({
      pubkey: clientPubkey,
    }).lean();
    if (existingUser != null)
      throw "User with that key already exists";
    existingUser = await User.findOne({ username: username });
    if (existingUser != null) throw "Username is taken";

    const message = generateMessage();
    await User.create({
      pubkey: clientPubkey,
      username: username,
      message: message,
    });

    return res.status(200).json({ message: message });
  } catch (e) {
    console.log(e);
    await User.deleteOne({ pubkey: clientPubkey });
    return res.status(400).json({ e: e });
  }
}

async function completeSignup(req, res) {
  const clientPubkey = req.body.clientPubkey;
  const displayName = req.body.displayName;
  const signature = req.body.signature;
  console.log(
    "Verifying wallet " +
      clientPubkey +
      " to create new user: " +
      displayName
  );

  try {
    if (clientPubkey == null) throw "No client key";
    if (displayName == null) throw "No display name";
    if (signature == null) throw "No signed message";

    let newUser = await User.findOne({ pubkey: clientPubkey });

    const unsignedMessage = newUser.message;
    // const parsedSignature = Uint8Array.from(signature);
    const signatureVerified = verifyMessage(
      unsignedMessage,
      signature,
      clientPubkey
    );

    if (!signatureVerified)
      throw "Signature could not be verified";

    //generate new message to prevent duplicate requests being verified
    newUser.message = generateMessage();
    newUser.displayName = displayName;
    await newUser.save();

    return res.status(200).json({ m: "Account created" });
  } catch (e) {
    //if something goes wrong, delete the user record created in the
    //new user request route
    await User.deleteOne({ pubkey: clientPubkey });
    console.log(e);
    return res.status(400).json({ e: e });
  }
}
