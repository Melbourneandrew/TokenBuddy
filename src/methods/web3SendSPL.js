/*This method is called from sendTransaction.js to send SPL
tokens. Split logic from sending SOL tokens as the two work differently */
import {
  Transaction,
  Connection,
  PublicKey,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  getOrCreateAssociatedTokenAccount,
  createTransferCheckedInstruction,
} from "@solana/spl-token";
import getStoredKeypair from "./get/getStoredKeypair";
import getTokenBalances from "./get/getTokenBalances";
import RPCEndpoints from "./RPCEndpoints";
const rpcEndpoint =
  RPCEndpoints[import.meta.env.VITE_SOLANA_NETWORK_SLUG];

export default async function sendSPL(
  recipientKey,
  tokenAmmount,
  tokenMint
) {
  const sender = await getStoredKeypair();
  console.log(sender)
  //reciever public key
  const recieverPk = new PublicKey(recipientKey);
  const mintPk = new PublicKey(tokenMint);

  const connection = new Connection(rpcEndpoint);
  const senderTokenAccount =
    await getOrCreateAssociatedTokenAccount(
      connection,
      sender,
      mintPk,
      sender.publicKey
    );
  const recieverTokenAccount =
    await getOrCreateAssociatedTokenAccount(
      connection,
      sender,
      mintPk,
      recieverPk
    );
  console.log(
    senderTokenAccount.address,
    mintPk,
    recieverTokenAccount.address,
    sender.publicKey,
    tokenAmmount
  );
  console.log(tokenMint);
  const transaction = new Transaction().add(
    createTransferCheckedInstruction(
      senderTokenAccount.address,
      mintPk,
      recieverTokenAccount.address,
      sender.publicKey,
      tokenAmmount,
      2
    )
  );
  const txId = await sendAndConfirmTransaction(
    connection,
    transaction,
    [sender]
  );
  return txId;
}
