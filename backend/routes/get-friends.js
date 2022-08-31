const { verifyJWT } = require("../scripts/tokens.js");
const User = require("../models/user.js");

module.exports = function (router) {
  router.get("/user/friends", verifyJWT, getFriends);
};

async function getFriends(req, res) {
  const clientUsername = res.locals.clientUsername;
  console.log("Friend list request for: " + clientUsername);
  try {
    if (clientUsername == null)
      throw "No username on friend-list request";

    let client = await User.findOne(
      { username: clientUsername },
      "friends"
    ).lean();
    if (client == null) throw "No user with that username";
    console.log(client)
    let friends = await User.find({'_id':{$in: client.friends}}).lean();
    return res
      .status(200)
      .json({ m: "success", friends: friends });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ e: error });
  }
}
