import { Preferences } from "@capacitor/preferences";
import { Capacitor } from "@capacitor/core";
import fetchTokenBalances from "../fetch/fetchTokenBalances";
import storeTokenBalances from "../store/storeTokenBalances";

//how long stored token balance is valid for
const MINS_VALID = 1;
const MS_PER_MIN = 1000 * 60;
const MS_VALID = MS_PER_MIN * MINS_VALID;

export default async function getTokenBalances(
  pubkey,
  networkSlug
) {
  var rpcEndpoint;
  if (networkSlug == "devnet")
    rpcEndpoint = "https://api.devnet.solana.com";
  else if (networkSlug == "mainnet-beta")
    rpcEndpoint = "https://api.mainnet-beta.solana.com";
  else throw "Invalid network slug";

  const isNative = Capacitor.isNativePlatform();
  var tokenBalances;
  if (isNative) tokenBalances = await getTokenBalancesNative();
  else tokenBalances = await getTokenBalancesWeb();

  //no stored token balances
  if (tokenBalances == null) {
    console.log("Stored token balances is null. Fetching...");
    const newTokenBals = await fetchTokenBalances(
      pubkey,
      networkSlug
    );
    await storeTokenBalances(newTokenBals);
    return newTokenBals;
  }

  //check expiration on token balances
  const tokenBalsExpDate = tokenBalances.storeDate + MS_VALID;
  const today = new Date().getTime();
  if (tokenBalsExpDate <= today) {
    console.log(
      "Stored token balances out of date. Fetching..."
    );
    const newTokenBals = await fetchTokenBalances(
      pubkey,
      networkSlug
    );
    await storeTokenBalances(newTokenBals);
    return newTokenBals;
  }
  console.log("Got stored token balances")
  return tokenBalances.tokens
}

async function getTokenBalancesNative() {
  try {
    const bals = await Preferences.get({
      key: "tokenBalances",
    });

    return JSON.parse(bals.value, reviver);
  } catch (err) {
    console.log(err);
    return false;
  }
}
async function getTokenBalancesWeb() {
  const bals = JSON.parse(
    localStorage.getItem("tokenBalances"),
    reviver
  );
  return bals;
}

function reviver(key, value) {
  if (typeof value === "object" && value !== null) {
    if (value.dataType === "Map") {
      return new Map(value.value);
    }
  }
  return value;
}
