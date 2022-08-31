import { Preferences } from "@capacitor/preferences";
import { Capacitor } from "@capacitor/core";
import { useCookies } from "vue3-cookies";

export default async function getStoreKeys() {
  const isNative = Capacitor.isNativePlatform();

  if (isNative) return await getStoreKeysNative();
  else return await getStoreKeysWeb();
}

async function getStoreKeysNative() {
  let keys = await Preferences.keys();
  return keys.keys;
}
async function getStoreKeysWeb() {
  const { cookies } = useCookies();
  return cookies.keys();
}
