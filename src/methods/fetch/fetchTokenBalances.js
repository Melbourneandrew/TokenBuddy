import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import getTokenMap from "../get/getTokenMap";
import RPCEndpoints from "../RPCEndpoints";
const rpcEndpoint =
  RPCEndpoints[import.meta.env.VITE_SOLANA_NETWORK_SLUG];
export default async function fetchTokenBalances(pubkey) {
  // console.log("Connecting to solana for token balance check");
  const solanaConnection = new Connection(rpcEndpoint);
  const filters = [
    {
      dataSize: 165, //size of account (bytes)
    },
    {
      memcmp: {
        offset: 32, //location of our query in the account (bytes)
        bytes: pubkey, //our search criteria, a base58 encoded string
      },
    },
  ];

  /*
  get token accounts for pubkey from solana RPC
  */
  // console.log("Getting parsed program accounts");
  const accounts =
    await solanaConnection.getParsedProgramAccounts(
      TOKEN_PROGRAM_ID, //SPL Token Program, new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
      { filters: filters }
    );
  // console.log("Got accounts");
  /*
  Sort the parsed accounts for only the accounts relevant to this
  application. Accounts that are empty or hold NFT's are not 
  relevant
   */
  let relevantAccounts = [];
  for (let i = 0; i < accounts.length; i++) {
    let account = accounts[i].account.data.parsed.info;
    //accounts with balance zero are irrelevant
    if (account.tokenAmount.amount == "0") continue;
    //accounts with zero decimals (NFT) are irrelevant
    if (account.tokenAmount.decimals == 0) continue;
    relevantAccounts.push({
      mint: account.mint,
      balance: account.tokenAmount.uiAmount,
      accountPk: accounts[i].pubkey.toBase58(),
    });
  }
  /*
  Get list of registered tokens along with their data.
  This includes the name, symbol, and icon for the tokens.
  This list will be reduced into a map keyed by the token mint.
  List is large, a copy will be stored for 5 days and then be
  re-fetched for updates.
  */
  // console.log("Getting token map");
  const tokenMap = await getTokenMap();
  /*
  At this stage we assemble the relevant information.
  The balance of each token will be combined with the data for
  the UI to display (name, symbol, icon)
  */
  let tokenBalances = [];
  for (let account of relevantAccounts)
    tokenBalances.push({
      balance: account.balance,
      tokenInfo: tokenMap.get(account.mint),
      mint: account.mint,
      accountPk: account.accountPk,
    });

  //add sol token to token balances
  let solAccount = new PublicKey(pubkey);
  let solBalance = await solanaConnection.getBalance(
    solAccount
  );
  tokenBalances.push({
    balance: solBalance / LAMPORTS_PER_SOL,
    tokenInfo: {
      logo: "/sol_image.png",
      name: "Solana",
      symbol: "SOL",
    },
    mint: "SOL",
  });
  return tokenBalances;
}
