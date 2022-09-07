const User = require("../models/UserModel")
const { verifyJWT } = require("../scripts/tokens.js");
const {
  uploadImagesCloudflare,
} = require("../scripts/image-upload.js");
const MulterUpload = require("../scripts/upload-midware");

module.exports = function (router) {
  router.post(
    "/user/pfp",
    verifyJWT,
    MulterUpload.single("pfp"),
    uploadPfp
  );
};

async function uploadPfp(req, res) {
  const clientUsername = res.locals.clientUsername;
  const pfpFile = req.file;
  console.log("New pfp request for user: " + clientUsername);
  try {
    if (pfpFile === null) throw "No file attached";
    let user = await User.findOne({ username: clientUsername });
    if (user == null)
      throw "No user registered with that username";

    const imageName = `txpay_${user.username}_${Math.floor(
      Math.random() * 1000
    )}`;
    const pfpLink = await uploadImagesCloudflare(
      [pfpFile],
      imageName
    );
    console.log("Images uploaded");

    user.pfp = pfpLink[0];
    user.save();

    return res.status(200).json({ m: "Pfp uploaded successfully", link:pfpLink[0] });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ e: error });
  }
}
