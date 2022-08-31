import { Preferences } from "@capacitor/preferences";
import { Capacitor } from "@capacitor/core";
import { useCookies } from "vue3-cookies";

export default async function storeKeypair(keypair) {
  const isNative = Capacitor.isNativePlatform();
  console.log("Storing keypair...");
  if (isNative) return await storeKeypairNative(keypair);
  else return await storeKeypairWeb(keypair);
}

/*
Keypair will be stored by extracting the secret key and 
putting it in local storage using the capacitor prefrences
api. This only supports storing strings so the secret key 
buffer must be converted to a string and stored.

when the keypair needs to be retrieved, the stored
string will be re-encoded into a buffer and used
to create a new keypair object
*/

async function storeKeypairNative(keypair) {
  let privKey = keypair.secretKey;

  privKey = String.fromCharCode(...privKey);

  try {
    await Preferences.set({
      key: "privKey",
      value: privKey,
    });
    console.log("Keypair stored");
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
async function storeKeypairWeb(keypair) {
  const { cookies } = useCookies();

  let privKey = keypair.secretKey;
  privKey = String.fromCharCode(...privKey);

  cookies.set("privKey", privKey);
  console.log("Keypair stored");

  return true;
}
