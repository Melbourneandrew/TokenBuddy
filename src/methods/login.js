import axios from "axios";
import nacl from "tweetnacl";
const url = import.meta.env.VITE_API_URL;
import { Buffer } from "buffer";

export default async function login(keypair) {
  const pubkey = keypair.publicKey;

  let tryLoginRes = await axios.post(`${url}/user/request-token`, {
    clientPubkey: pubkey,
  });
  let message = tryLoginRes.data.message;
  if (tryLoginRes.status != 200) throw "Signup request failed";
  if (message == null)
    throw "No message to sign from /user/request-new response";

  const parsedMessage = new Uint8Array(Buffer.from(message));
  let signature = nacl.sign.detached(parsedMessage, keypair.secretKey);

  let confirmLoginRes = await axios.post(`${url}/user/retrieve-token`, {
    clientPubkey: pubkey,
    signature: signature,
  });
  console.log(confirmLoginRes);
  if (confirmLoginRes.status != 200)
    throw "Login confirmation (signup step 2) failed";

  return [confirmLoginRes.data.token, confirmLoginRes.data.user];
}
