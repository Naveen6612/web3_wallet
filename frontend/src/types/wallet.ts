export interface WalletAccount {
   id: string;          // unique id like `account-0`, `account-1`, etc.
  name: string;
  address: string;
  publicKey: string;
  privateKey: string;
  mnemonic: string;
  balance: string;
}
export interface WalletContextType {
  accounts: WalletAccount[];
  createAccount: () => Promise<void>;
  deleteAccount: (index: number) => void;
  mnemonic: string;
  refreshBalances: () => Promise<void>;
}
