import { Preferences } from "@capacitor/preferences";
import { Capacitor } from "@capacitor/core";
import storeTokenMap from "../store/storeTokenMap";
import fetchTokenMap from "../fetch/fetchTokenMap";

//how long the stored token map is valid for
const DAYS_VALID = 5;
const MS_PER_DAY = 1000 * 60 * 60 * 24;
const MS_VALID = MS_PER_DAY * DAYS_VALID;
export default async function getTokenMap(tokenMapSlug) {
  const isNative = Capacitor.isNativePlatform();

  var tokenMap;
  if (isNative) tokenMap = await getTokenMapNative();
  else tokenMap = await getTokenMapWeb();

  if (tokenMap == null) {
    console.log("Stored token map is null. Fetching...");
    const newTokenMap = await fetchTokenMap(tokenMapSlug);
    await storeTokenMap(newTokenMap);
    return newTokenMap;
  }
  //check expiration on token map
  const tokenMapExpDate = tokenMap.storeDate + MS_VALID;
  const today = new Date().getTime();
  if (tokenMapExpDate <= today) {
    console.log("Stored token map is out of date. Fetching...");
    const newTokenMap = await fetchTokenMap(tokenMapSlug);
    await storeTokenMap(newTokenMap);
    return newTokenMap;
  } else {
    return tokenMap.tokenMap;
  }
}

async function getTokenMapNative() {
  try {
    const tokenMap = await Preferences.get({
      key: "tokenMap",
    });

    return JSON.parse(tokenMap.value, reviver);
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function getTokenMapWeb() {
  const tokenMap = JSON.parse(localStorage.getItem("tokenMap"), reviver);
  return tokenMap;
}

function reviver(key, value) {
  if(typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value);
    }
  }
  return value;
}