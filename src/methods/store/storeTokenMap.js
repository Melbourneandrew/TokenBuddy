import { Preferences } from "@capacitor/preferences";
import { Capacitor } from '@capacitor/core';

export default async function storeTokenMap(tokenMap){
    const isNative = Capacitor.isNativePlatform();

    const tokens = {
        tokenMap: tokenMap,
        storeDate : new Date().getTime()
    }
    if(isNative) return await storeTokenMapNative(tokens)
    else return await storeTokenMapWeb(tokens)
}

async function storeTokenMapNative(tokens){
    try {
        await Preferences.set({
          key: "tokenMap",
          value: JSON.stringify(tokens,replacer),
        });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
}

async function storeTokenMapWeb(tokens){
    localStorage.setItem('tokenMap', JSON.stringify(tokens, replacer));
    return true;
}

function replacer(key, value) {
  if(value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  } else {
    return value;
  }
}