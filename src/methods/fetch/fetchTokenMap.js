import axios from "axios";
import { TokenListProvider } from "@solana/spl-token-registry";

export default async function fetchTokenMap(slug) {
  /*
  Fetch list of registered tokens along with their data.
  This includes the name, symbol, and icon for the tokens.
  This list will be reduced into a map keyed by the token mint
  */
  const tokenList = await (
    await new TokenListProvider().resolve()
  )
    .filterByClusterSlug(slug)
    .getList();
  const tokenMap = tokenList.reduce((map, token) => {
    map.set(token.address, {
      logo: token.logoURI,
      name: token.name,
      symbol: token.symbol,
    });
    return map;
  }, new Map());
  
  return tokenMap;
}
