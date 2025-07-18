import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(
  import.meta.env.VITE_SEPOLIA_RPC_URL
);

export const createNewAccount = () => {
  const wallet = ethers.Wallet.createRandom();

  if (!wallet.mnemonic) {
    throw new Error("Mnemonic not available for this wallet");
  }

  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic.phrase,
  };
};
export const getBalance = async (address: string) => {
  try {
    const balanceBigInt = await provider.getBalance(address);
    return ethers.formatEther(balanceBigInt); // Return ETH as string
  } catch (error) {
    console.error("Error getting balance:", error);
    return "0";
  }
};
