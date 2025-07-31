import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { Connection } from "@solana/web3.js";
import { Tabs } from "antd";
import { Copy, Eye, EyeOff } from "lucide-react";
import "./cssFolder/MainWallet.css";

const connection = new Connection("https://api.devnet.solana.com");

export default function MainWallet() {
  const { publicKey, connected } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [showBalance, setShowBalance] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        const lamports = await connection.getBalance(publicKey);
        setBalance(lamports / 1e9); // convert to SOL
      }
    };
    fetchBalance();
  }, [publicKey]);

  if (!connected) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-6 py-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
          Connect to your wallet first
        </h1>
        <p className="text-gray-400 text-center mb-6 max-w-md">
          To view your account details, tokens, NFTs, and DeFi info, please connect your browser wallet using the Connect Wallet in the Right Top corner.
        </p>
        <div className="w-12 h-12 border-4 border-dashed border-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          {/* Removed WalletMultiButton */}
          <button className="bg-white text-black rounded-full w-8 h-8 text-sm">4</button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600" />
        </div>
      </div>

      {/* Account Summary */}
      <div className="bg-[#111] p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-lg font-semibold mb-2">Decentralized accounts</h2>
        <div className="flex items-center gap-4">
          <span className="text-3xl font-bold">
            {showBalance ? `$${balance?.toFixed(2) || "0.00"}` : "••••"}
          </span>
          <button onClick={() => setShowBalance(!showBalance)} title="Toggle Balance">
            {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
        <p className="text-red-400 text-sm mt-1">$0.00 (0.00%)</p>

        {/* Address Dropdowns */}
        {publicKey && (
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="bg-[#222] px-4 py-2 rounded-md flex items-center justify-between w-full sm:w-1/2">
              <span className="truncate">{publicKey.toBase58()}</span>
              <button
                onClick={() => navigator.clipboard.writeText(publicKey.toBase58())}
                title="Copy address"
              >
                <Copy size={16} />
              </button>
            </div>

            <div className="bg-[#222] px-4 py-2 rounded-md text-sm">
              7 Networks ▼ {/* Replace with actual dropdown later */}
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <Tabs
        defaultActiveKey="tokens"
        className="custom-dark-tabs"
        items={[
          { key: "tokens", label: "Tokens", children: <div>No tokens yet.</div> },
          { key: "nfts", label: "NFTs", children: <div>No NFTs.</div> },
          { key: "defi", label: "DeFi", children: <div>Coming soon.</div> },
          {
            key: "spending",
            label: "Spending Caps",
            children: (
              <div className="text-center py-12">
                <div className="text-gray-300 mb-2">
                  A spending cap is a set permission allowing a smart contract to use a limited amount of your tokens.
                </div>
                <p className="text-gray-400">No spending caps found for selected accounts.</p>
              </div>
            ),
          },
        ]}
      />

      
    </div>
  );
}
