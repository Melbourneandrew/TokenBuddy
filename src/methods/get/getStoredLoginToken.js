import { Preferences } from "@capacitor/preferences";
import { Capacitor } from "@capacitor/core";
import { useCookies } from "vue3-cookies";

export default async function getStoredLoginToken() {
  const isNative = Capacitor.isNativePlatform();

  if (isNative) return await getStoredLoginTokenNative();
  else return await getStoredLoginTokenWeb();
}
async function getStoredLoginTokenWeb() {
  const { cookies } = useCookies();

  return cookies.get("token");
}
async function getStoredLoginTokenNative() {
  try {
    const token = await Preferences.get({
      key: "token",
    });

    return JSON.parse(token.value);
  } catch (err) {
    console.log(err);
    return false;
  }
}
