import { Preferences } from "@capacitor/preferences";
import { Capacitor } from "@capacitor/core";

export default async function storeTokenBalances(tokens) {
  const isNative = Capacitor.isNativePlatform();

  const balances = {
    tokens: tokens,
    storeDate: new Date().getTime(),
  };

  if (isNative) return await storeTokenBalancesNative(balances);
  else return await storeTokenBalancesWeb(balances);
}

async function storeTokenBalancesNative(tokens) {
  try {
    await Preferences.set({
      key: "tokenBalances",
      value: JSON.stringify(tokens,replacer),
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function storeTokenBalancesWeb(tokens) {
  localStorage.setItem(
    "tokenBalances",
    JSON.stringify(tokens, replacer)
  );
  return true;
}

function replacer(key, value) {
  if (value instanceof Map) {
    return {
      dataType: "Map",
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  } else {
    return value;
  }
}
