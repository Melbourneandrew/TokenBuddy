import { Preferences } from "@capacitor/preferences";
import { Capacitor } from "@capacitor/core";
import { useCookies } from "vue3-cookies";

export default async function getStoredUserInfo(){
    const isNative = Capacitor.isNativePlatform();

    if(isNative) return await getStoredUserInfoNative();
    else return await getStoredUserInfoWeb();
}

async function getStoredUserInfoNative(){
    try {
        const user = await Preferences.get({
          key: "user",
        });
    
        return JSON.parse(user.value);
      } catch (err) {
        console.log(err);
        return false;
      }
}

async function getStoredUserInfoWeb(){
    const { cookies } = useCookies();

    return cookies.get("user");
}