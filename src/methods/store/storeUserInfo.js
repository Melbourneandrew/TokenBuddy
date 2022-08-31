import { Preferences } from "@capacitor/preferences";
import { Capacitor } from '@capacitor/core';
import { useCookies } from "vue3-cookies";

export default async function storeUserInfo(user){
    const isNative = Capacitor.isNativePlatform();

    if (isNative) return await storeUserInfoNative(user);
    else return await storeUserInfoWeb(user)
}

async function storeUserInfoNative(user){
    try {
        await Preferences.set({
          key: "user",
          value: JSON.stringify(user),
        });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
}

async function storeUserInfoWeb(user){
    const {cookies} = useCookies();
    cookies.set("user", user);
    return true;
}