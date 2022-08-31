const SEED_SIZE_BITS = 256;
import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';

export default function generateSeed() {
    const mnemonic = bip39.generateMnemonic(wordlist);
    const seed = bip39.mnemonicToSeedSync(mnemonic);
  return { mnemonic, seed };
}
