// src/pages/ConnectWallet.tsx
import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ConnectWallet = () => {
  const [mnemonicWords, setMnemonicWords] = useState<string[]>(Array(12).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const handleInputChange = (index: number, value: string) => {
    const newWords = [...mnemonicWords];
    if (value.endsWith(" ") && index < 11) {
      newWords[index] = value.trim().toLowerCase();
      setMnemonicWords(newWords);
      inputRefs.current[index + 1]?.focus();
    } else {
      newWords[index] = value.toLowerCase();
      setMnemonicWords(newWords);
    }
  };

  const handleConnect = async () => {
    const mnemonic = mnemonicWords.join(" ").trim();

    if (mnemonicWords.includes("")) {
      alert("Please fill all 12 words of your mnemonic.");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/connect`,
        { mnemonic }
      );

      const { uuid } = res.data;

      // ✅ Store uuid locally
      localStorage.setItem("wallet_uuid", uuid);
      localStorage.setItem("wallet_mnemonic", mnemonic); // optional: for in-memory use

      // ✅ Redirect to set-password page
      navigate("/set-password");
    } catch (err) {
      console.error("Connection failed:", err);
      alert("Invalid mnemonic or server error.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-black text-white relative">
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 text-sm text-white hover:text-blue-400 transition duration-200"
      >
        ← Back to Login
      </button>

      <h1 className="text-3xl font-bold mb-6">Connect Your Wallet</h1>
      <p className="text-sm text-zinc-400 mb-4">
        ⚠️ Press <span className="font-semibold text-white">Space</span> after each word to move to the next input box.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6 w-full max-w-3xl">
        {mnemonicWords.map((word, idx) => (
          <div key={idx} className="relative">
            <input
              type="text"
              value={word}
              onChange={(e) => handleInputChange(idx, e.target.value)}
             
              className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-lg px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-zinc-400"
              placeholder={`Word ${idx + 1}`}
              maxLength={20}
            />
            <span className="absolute top-1 left-2 text-xs text-zinc-500">{idx + 1}</span>
          </div>
        ))}
      </div>

      <button
        onClick={handleConnect}
        className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium px-8 py-3 rounded-xl transition-all duration-200"
      >
        Connect Wallet
      </button>
    </div>
  );
};

export default ConnectWallet;
