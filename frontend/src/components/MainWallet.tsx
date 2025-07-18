import { useEffect, useState } from "react";
import { getBalance } from "@/utils/utilsWallet";
import type { WalletAccount } from "@/types/wallet";
import { fetchCryptoPrices } from "@/utils/fetchPrice";
// import { useNavigate } from "react-router-dom";


const MainWallet = () => {
  const [accounts, setAccounts] = useState<WalletAccount[]>([]);
  const [prices, setPrices] = useState<{ [key: string]: { usd: number } }>({});
  // const [showMnemonic] = useState(false);
  // const [mnemonic] = useState("");
  // const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("wallet_accounts");
    if (stored) {
      const parsed: WalletAccount[] = JSON.parse(stored);
      Promise.all(
        parsed.map(async (acc) => {
          const balance = await getBalance(acc.address);
          return { ...acc, balance };
        })
      ).then(setAccounts);
    }
    fetchCryptoPrices(["ethereum", "bitcoin", "dogecoin", "solana"]).then(
      setPrices
    );
  }, []);

    const handleDeleteAccount = (index: number) => {
    const updated = accounts.filter((_, i) => i !== index);
    setAccounts(updated);
    localStorage.setItem("wallet_accounts", JSON.stringify(updated));
  };



  // const handleRevealMnemonic = () => {
  //   const saved = localStorage.getItem("wallet_mnemonic");
  //   if (!saved) return alert("No mnemonic found.");
  //   const confirmReveal = window.confirm(
  //     "Are you sure you want to reveal your secret recovery phrase? Never share this with anyone."
  //   );
  //   if (confirmReveal) {
  //     navigate("/generate-mnemonic");
  //   }
  // };

  return (
    <div className="flex h-screen text-white">

      <div
        className={`transition-all duration-300 px-6 py-8 bg-[#0d1117] min-h-screen text-white `}
      >


        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Ethereum Wallet</h1>
          {accounts.length > 0 && (
            <div className="text-green-400 font-semibold">
              Total Balance:{" "}
              {accounts
                .reduce((acc, a) => acc + parseFloat(a.balance), 0)
                .toFixed(4)}{" "}
              ETH
            </div>
          )}
        </div>

        {accounts.length === 0 ? (
          <p className="text-gray-400">No accounts yet.</p>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {accounts.map((acc, idx) => (
              <div
                key={idx}
                className="border border-gray-700 rounded-md p-4 bg-[#161b22]"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-400">Account {idx + 1}</p>
                  <button
                    onClick={() => handleDeleteAccount(idx)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>
                <p className="break-all text-lg">Address: {acc.address}</p>
                <p className="break-all text-sm text-gray-400">
                  Private Key: {acc.privateKey}
                </p>
                <p className="break-all text-sm text-gray-400">
                  Mnemonic: {acc.mnemonic}
                </p>
                <p className="text-green-400 mt-2 font-semibold">
                  Balance: {acc.balance} ETH
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Footer: Live Prices */}
        <div className="mt-10 p-4 bg-[#1e2638] rounded-md">
          <h3 className="text-lg font-semibold mb-2">Live Coin Prices (USD)</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            {Object.entries(prices).map(([key, val]) => (
              <div key={key} className="text-gray-300">
                <strong className="text-white uppercase">{key}</strong>: $
                {val.usd.toFixed(2)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainWallet;
