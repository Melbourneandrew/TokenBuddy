/*This method is called in sendTransaction.js to send SOL
tokens. Split logic from sending SPL tokens as the two work differently */
import {
  Connection,
  Transaction,
  LAMPORTS_PER_SOL,
  SystemProgram,
  PublicKey,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import getStoredKeypair from "./get/getStoredKeypair";
import RPCEndpoints from "./RPCEndpoints";

const rpcEndpoint =
  RPCEndpoints[import.meta.env.VITE_SOLANA_NETWORK_SLUG];

export default async function sendSol(
  recipientKey,
  tokenAmmount
) {
  const sender = await getStoredKeypair();
  const recieverPk = new PublicKey(recipientKey);
  console.log(sender.publicKey);
  console.log(recieverPk);
  console.log(LAMPORTS_PER_SOL * tokenAmmount);
  const connection = new Connection(rpcEndpoint);
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: sender.publicKey,
      toPubkey: recieverPk,
      lamports: LAMPORTS_PER_SOL * tokenAmmount,
    })
  );

  const signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [sender]
  );

  return signature;
}
