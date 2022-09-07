const User = require("../models/UserModel")

module.exports = function (router) {
  router.get("/user/search", searchUsers);
};

async function searchUsers(req, res) {
  const userText = req.query.s;

  const users = await User.find({
    username: { $regex: new RegExp('^'+userText) },
  }).limit(10).lean();
  return res.status(200).json({ results: users });
}
