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

export default async function sendTokens(
  recipientKey,
  ammount,
  networkSlug
) {
  const rpcEndpoint = RPCEndpoints[networkSlug];
  const sender = await getStoredKeypair();
  const recieverPk = new PublicKey(recipientKey);
  console.log(sender.publicKey)
  console.log(recieverPk)
  console.log(LAMPORTS_PER_SOL * ammount)
  const connection = new Connection(rpcEndpoint);
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: sender.publicKey,
      toPubkey: recieverPk,
      lamports: LAMPORTS_PER_SOL * ammount,
    })
  );

  const signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [sender]
  );

  return console.log(signature);
}
