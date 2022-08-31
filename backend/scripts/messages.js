const crypto = require("crypto");
const Base58 = require("base-58");
const nacl = require("tweetnacl");

function generateMessage() {
  const size = 32; //in bytes

  const buf = Buffer.alloc(size);
  const msg = crypto.randomFillSync(buf).toString("hex");

  return msg;
}

/*takes unsigned: String, signed: Buffer from json, key: as base58 string*/
function verifyMessage(unsigned, signed, key) {
  const publicKeyBuffer = Base58.decode(key);
  const signedMessage = Uint8Array.from(Object.values(signed));
  const unsignedMessage = new Uint8Array(Buffer.from(unsigned));

  //verify mesasge with nacl
  const messageVerified = nacl.sign.detached.verify(
    unsignedMessage,
    signedMessage,
    publicKeyBuffer
  );

  return messageVerified;
}

module.exports = { generateMessage, verifyMessage };