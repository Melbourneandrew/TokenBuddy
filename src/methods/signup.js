import axios from "axios";
import nacl from "tweetnacl";
import { Buffer } from 'buffer'

const url = import.meta.env.VITE_API_URL;
export default async function signup(keypair, username, displayName) {
  const pubkey = keypair.publicKey
  let trySignupRes = await axios.post(`${url}/user/request-new`, {
    clientPubkey: pubkey,
    username: username,
  });
  
  if (trySignupRes.status != 200) throw "Signup request failed";
  let message = trySignupRes.data.message;
  if (message == null)
    throw "No message to sign from /user/request-new response";

  const parsedMessage = new Uint8Array(Buffer.from(message));
  let signature = nacl.sign.detached(parsedMessage, keypair.secretKey);

  let confrirmSignupRes = await axios.post(`${url}/user/create-new`, {
    clientPubkey: pubkey,
    displayName: displayName,
    signature: signature,
  });
  console.log(confrirmSignupRes)
  if (confrirmSignupRes.status != 200)
    throw "Signup confirmation (signup step 2) failed";
}
