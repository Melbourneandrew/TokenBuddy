import RPCEndpoints from "./RPCEndpoints";
import axios from "axios";
import getStoredUserInfo from "./get/getStoredUserInfo";
import getStoredLoginToken from "./get/getStoredLoginToken";
import web3SendSOL from "./web3SendSOL";
import web3SendSPL from "./web3SendSPL";
const rpcEndpoint =
  RPCEndpoints[import.meta.env.VITE_SOLANA_NETWORK_SLUG];
const url = import.meta.env.VITE_API_URL;

export default async function sendTransaction(
  reciever,
  tokenMint,
  tokenName,
  tokenSymbol,
  tokenAmmount
) {
  const sender = await getStoredUserInfo();
  console.log(rpcEndpoint);
  try {
    //sending SOL and SPL works differently
    var sendTokens =
      tokenMint == "SOL" ? web3SendSOL : web3SendSPL;

    const txId = await sendTokens(
      reciever,
      tokenAmmount,
      tokenMint
    );
    console.log(txId);

    await postTransactionToAPI({
      reciever: reciever,
      sender: sender.username,
      tokenMint: tokenMint,
      tokenName: tokenName,
      tokenSymbol: tokenSymbol,
      tokenAmmount: tokenAmmount,
      txId: txId,
    });
  } catch (error) {
    console.log(error);
  }
}

async function postTransactionToAPI(data) {
  const authToken = await getStoredLoginToken();

  const newTxRes = await axios({
    method: "post",
    url: `${url}/tx/new`,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    data: data,
  });

  console.log(newTxRes);
}
