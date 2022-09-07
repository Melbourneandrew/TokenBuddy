const mongoose = require("mongoose");
const { generateMessage } = require("../scripts/messages.js");
const default_pfp = 'https://imagedelivery.net/tQa_QONPmkASFny9ZSDT4A/658a25ba-5b3a-4974-3920-f4adb05e2d00/public'

const UserSchema = new mongoose.Schema({
  pubkey: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
    maxlength: 21,
  },
  displayName: {
    type: String,
    maxlength: 21,
  },
  message:{
    type:String,
    default: generateMessage(),
  },
  pfp:{
    type:String,
    default: default_pfp
  },
  friends:{
    type:[mongoose.Schema.ObjectId],
    ref: "User",
    select: false
  }
});

module.exports = mongoose.model('User', UserSchema)
