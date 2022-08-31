import { Preferences } from "@capacitor/preferences";
import { Keypair } from "@solana/web3.js";
import { Capacitor } from '@capacitor/core';
import { useCookies } from "vue3-cookies";

export default async function getStoredKeypair(){
  const isNative = Capacitor.isNativePlatform();
  console.log(isNative);
  if(isNative) return await getStoredKeypairNative()
  else return await getStoredKeypairWeb();
}

async function getStoredKeypairWeb(){
  const {cookies} = useCookies();

  let privKey = cookies.get("privKey")

  privKey = Uint8Array.from(
    [...privKey].map((ch) => ch.charCodeAt())
  );

  return Keypair.fromSecretKey(privKey);
}
async function getStoredKeypairNative() {
  let privKey = await Preferences.get({ key: "privKey" });

  privKey = Uint8Array.from(
    [...privKey.value].map((ch) => ch.charCodeAt())
  );

  return Keypair.fromSecretKey(privKey);
}
