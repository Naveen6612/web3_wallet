// src/utils/hdWallet.ts
import { ethers } from "ethers";
import * as bip39 from "bip39";

const ETH_DERIVATION_PATH = "m/44'/60'/0'/0"; // Ethereum standard path

// Generate initial mnemonic (only once during wallet creation)
export const generateMnemonic = (): string => {
  return bip39.generateMnemonic();
};

// Derive a child account using the stored mnemonic and index
export const deriveAccount = async (mnemonic: string, index: number = 0) => {
  const seed = await bip39.mnemonicToSeed(mnemonic); // returns Buffer
  const hdNode = ethers.HDNodeWallet.fromSeed(Uint8Array.from(seed)); // fix for Buffer
  const childNode = hdNode.derivePath(`${ETH_DERIVATION_PATH}/${index}`);

  return {
    address: childNode.address,
    privateKey: childNode.privateKey,
    mnemonic,
  };
};
