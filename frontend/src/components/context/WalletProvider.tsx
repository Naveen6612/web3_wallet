import { useState, useEffect } from "react";
import { WalletContext } from "./WalletContext";
import type { WalletContextType } from "@/types/wallet";
import { getBalance } from "@/utils/utilsWallet";
import { deriveAccount } from "@/utils/hdWallets";
import type { WalletAccount } from "@/types/wallet";

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [accounts, setAccounts] = useState<WalletAccount[]>([]);
  const [mnemonic, setMnemonic] = useState("");

  useEffect(() => {
    const storedMnemonic = localStorage.getItem("wallet_mnemonic") || "";
    const storedAccounts = localStorage.getItem("wallet_accounts");
    setMnemonic(storedMnemonic);

    if (storedAccounts) {
      try {
        const parsed: Partial<WalletAccount>[] = JSON.parse(storedAccounts);

        // Fill missing fields to match WalletAccount structure
        const completeAccounts: WalletAccount[] = parsed.map((acc, index) => ({
          id: acc.id || `account-${index}`,
          name: acc.name || `Account ${index + 1}`,
          address: acc.address || "",
          balance: acc.balance || "0",
          privateKey: acc.privateKey || "",
          publicKey: acc.publicKey || "", // Derive if needed
          mnemonic: acc.mnemonic || storedMnemonic,
        }));

        setAccounts(completeAccounts);
      } catch (e) {
        console.error("Failed to parse accounts from localStorage:", e);
      }
    }
  }, []);

  const createAccount = async () => {
    if (!mnemonic) return alert("Mnemonic not found.");
    const index = accounts.length;
    const newAcc = await deriveAccount(mnemonic, index);
    const balance = await getBalance(newAcc.address);

    const account: WalletAccount = {
      ...newAcc,
      id: `account-${index}`,
      name: `Account ${index + 1}`,
      balance,

      mnemonic,
      publicKey: ""
    };

    const updated = [...accounts, account];
    setAccounts(updated);
    localStorage.setItem("wallet_accounts", JSON.stringify(updated));
  };

  const deleteAccount = (index: number) => {
    const updated = accounts.filter((_, i) => i !== index);
    setAccounts(updated);
    localStorage.setItem("wallet_accounts", JSON.stringify(updated));
  };

  const refreshBalances = async () => {
    const updated = await Promise.all(
      accounts.map(async (acc) => ({
        ...acc,
        balance: await getBalance(acc.address),
      }))
    );
    setAccounts(updated);
    localStorage.setItem("wallet_accounts", JSON.stringify(updated));
  };

  const value: WalletContextType = {
    accounts,
    createAccount,
    deleteAccount,
    mnemonic,
    refreshBalances,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};
