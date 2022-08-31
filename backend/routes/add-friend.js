const { verifyJWT } = require("../scripts/tokens.js");
const User = require("../models/user.js");
const { ObjectId } = require("mongodb");

module.exports = function (router) {
  router.post("/user/add-friend", verifyJWT, addFriend);
};

async function addFriend(req, res) {
  const clientUsername = res.locals.clientUsername;
  const friendUsername = req.body.friendUsername;
  console.log("Add friend request for " + clientUsername);
  try {
    if (clientUsername == null)
      throw "No username on add-friend request";
    if (friendUsername == null)
      throw "No friend username on add-friend request";
    if (friendUsername == clientUsername)
      throw "Users canno't be friends with themselves";

    let friend = await User.findOne({
      username: friendUsername,
    }).lean();

    let friendAdd = await User.updateOne(
      { username: clientUsername },
      { $addToSet: { friends: new ObjectId(friend._id) } }
    );
    if (friendAdd.matchedCount != 1)
      throw "That user does not exist";
    if (friendAdd.modifiedCount != 1)
      throw "You are already friends with this user";
    return res.status(200).json({ m: "success" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ e: error });
  }
}
