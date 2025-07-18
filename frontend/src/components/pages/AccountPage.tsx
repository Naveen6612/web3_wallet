import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EyeOff, Copy, ChevronDown } from "lucide-react";
import type { WalletAccount } from "@/types/wallet";

const TokenDashboard = () => {
  const { id } = useParams();
  const [account, setAccount] = useState<WalletAccount | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("wallet_accounts");
    if (stored) {
      const parsed: WalletAccount[] = JSON.parse(stored);
      const found = parsed.find((acc) => acc.id === id);
      if (found) setAccount(found);
    }
  }, [id]);

  if (!account) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Account not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6 flex flex-col items-center">
      {/* Address */}
      <div className="w-full max-w-5xl flex justify-start items-center gap-2 mb-6">
        <span className="text-sm font-mono truncate">{account.address}</span>
        <Copy size={16} className="cursor-pointer text-gray-400 hover:text-white" />
      </div>

      {/* Balance (Centered) */}
      <div className="flex flex-col items-center justify-center flex-grow text-center">
        <div className="text-5xl sm:text-6xl font-bold text-white mb-2">
          {parseFloat(account.balance).toFixed(4)} ETH
        </div>
        <div className="text-red-400 text-sm mb-6">${(parseFloat(account.balance) * 3000).toFixed(2)} est.</div>
        <EyeOff className="text-gray-400 hover:text-white cursor-pointer mb-6" />
      </div>

      {/* Keys & Mnemonic */}
      <div className="bg-[#111827] p-6 rounded-md max-w-2xl w-full mb-8 text-left shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Account Details</h3>
        <div className="mb-2">
          <span className="text-gray-400 text-sm">Public Address:</span>
          <p className="break-words text-sm">{account.address}</p>
        </div>
        <div className="mb-2">
          <span className="text-gray-400 text-sm">Private Key:</span>
          <p className="break-words text-sm">{account.privateKey}</p>
        </div>
        <div>
          <span className="text-gray-400 text-sm">Mnemonic:</span>
          <p className="break-words text-sm">{account.mnemonic}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full max-w-5xl flex justify-center flex-wrap border-b border-gray-700 mb-6">
        {["Tokens", "NFTs", "DeFi", "Transactions", "Spending Caps"].map((tab) => (
          <button
            key={tab}
            className="px-4 py-2 text-sm sm:text-base text-white hover:text-blue-400 border-b-2 border-transparent hover:border-blue-400 transition"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Networks and More */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-full text-sm hover:border-white transition">
          <span className="flex -space-x-2">
            <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png" alt="eth" className="w-5 h-5 rounded-full border" />
            <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.png" alt="btc" className="w-5 h-5 rounded-full border" />
            <span className="w-5 h-5 rounded-full bg-gray-700 text-xs flex items-center justify-center text-white">+4</span>
          </span>
          <span>7 Networks</span>
          <ChevronDown size={14} />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-full text-sm hover:border-white transition">
          More <ChevronDown size={14} />
        </button>
      </div>

      {/* No Tokens */}
      <div className="flex flex-col items-center text-center mt-12">
        <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mb-4">
          🌱
        </div>
        <p className="text-white font-semibold mb-2">No Tokens to Show</p>
        <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition">
          Token Marketplace
        </button>
      </div>
    </div>
  );
};

export default TokenDashboard;
