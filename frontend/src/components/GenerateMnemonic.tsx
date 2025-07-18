import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GenerateMnemonic = () => {
  const navigate = useNavigate();
  const [mnemonic, setMnemonic] = useState<string | null>(null);

  // Load mnemonic on mount
  useEffect(() => {
    const stored = localStorage.getItem("wallet_mnemonic");
    if (!stored) {
      alert("Mnemonic not found. Redirecting...");
      navigate("/create-wallet");
    } else {
      setMnemonic(stored);
    }
  }, [navigate]);

  const handleContinue = () => {
    if (!mnemonic) {
      alert("Mnemonic not found in storage.");
      return;
    }
    navigate("/main-wallet");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d] px-4">
      <div className="bg-[#141414] p-6 rounded-xl max-w-md w-full border border-[#2c2c2c] text-white">
        <h1 className="text-2xl font-bold mb-4">Your Secret Recovery Phrase</h1>
        <p className="text-gray-400 text-sm mb-6">
          Please save this 12-word phrase securely. It is the only way to
          recover your wallet.
        </p>

        {/* 🔐 Show Mnemonic */}
        {mnemonic ? (
          <div className="grid grid-cols-3 gap-2 mb-6">
            {mnemonic.split(" ").map((word, index) => (
              <div
                key={index}
                className="bg-[#1f1f1f] border border-[#333] rounded-md px-2 py-1 text-sm text-center"
              >
                {index + 1}. {word}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-400 text-sm mb-6">
            No mnemonic available. Please go back and create one.
          </p>
        )}

        {/* ✅ Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!mnemonic}
          className={`w-full py-2.5 rounded-md font-semibold transition-all ${
            mnemonic
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          I’ve Saved It
        </button>
      </div>
    </div>
  );
};

export default GenerateMnemonic;
