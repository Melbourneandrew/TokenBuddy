import {Keypair} from "@solana/web3.js"

export default function generateKeypair(seed){
    return Keypair.fromSeed(seed.slice(0,32));
}
