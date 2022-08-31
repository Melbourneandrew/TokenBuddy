import { Preferences } from "@capacitor/preferences";
import { Capacitor } from '@capacitor/core';
import { useCookies } from "vue3-cookies";

export default async function storeLoginToken(token){
  const isNative = Capacitor.isNativePlatform();

  if(isNative) return await storeLoginTokenNative(token);
  else return await storeLoginTokenWeb(token);
}
async function storeLoginTokenWeb(token){
  const {cookies} = useCookies();
  cookies.set("token", token);
  return true;
}
async function storeLoginTokenNative(token) {
  try {
    await Preferences.set({
      key: "token",
      value: JSON.stringify(token),
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
