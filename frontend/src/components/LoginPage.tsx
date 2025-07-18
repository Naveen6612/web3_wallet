import { useState, useEffect } from "react";
import { Wallet, Shield, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [walletExists, setWalletExists] = useState(false);
  const navigate = useNavigate();
  // const togglePassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    const storedPassword = localStorage.getItem("wallet_password");
    const storedMnemonic = localStorage.getItem("wallet_mnemonic");

    if (storedPassword && storedMnemonic) {
      setWalletExists(true); // ✅ wallet already created
    }
  }, []);

  const checkPassword = () => {
    const savedPassword = localStorage.getItem("wallet_password");
    const savedMnemonic = localStorage.getItem("wallet_mnemonic");

    if (password === savedPassword) {
      toast.success("Login successful");

      // ✅ Conditional redirect
      if (savedMnemonic) {
        navigate("/main-wallet");
      } else {
        navigate("/generate-mnemonic");
      }
    } else {
      toast.error("Wrong password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D1117] p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Wallet className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-white">WallEth</h1>
          <p className="text-gray-400 mt-1">Secure. Simple. Powerful.</p>
        </div>

        {/* Card */}
        <div className="bg-[#161B22] rounded-xl p-6 shadow-md border border-[#21262D]">
          <div className="text-center mb-6">
            <h2 className="text-white text-xl font-semibold">Welcome Back</h2>
            <p className="text-gray-400 text-sm mt-1">
              Enter your password to unlock your wallet
            </p>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-gray-300 mb-1 block">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded-md bg-[#21262D] border border-[#30363D] text-white placeholder:text-gray-500 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    checkPassword();
                  }
                }}
              />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault(); // 🛑 stop bubbling
                  setShowPassword((prev) => !prev); // 👁 toggle password
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              checkPassword();
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-md flex items-center justify-center gap-2 transition-colors"
          >
            <Shield className="w-4 h-4" />
            Unlock Wallet
          </button>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-[#30363D]" />
            <span className="text-gray-500 px-2 text-sm">or</span>
            <div className="flex-grow h-px bg-[#30363D]" />
          </div>

          <button
            onClick={() => navigate("/connect-wallet")}
            className="w-full bg-[#0D1117] border border-[#30363D] text-white hover:bg-[#1c2027] font-medium py-2.5 rounded-md transition-colors"
          >
            Connect Existing Wallet
          </button>
          {!walletExists && (
            <button
              onClick={() => navigate("create-wallet")}
              className="w-full bg-[#c73427] border border-[#30363D] text-white hover:bg-[#0b0d10] font-medium py-2.5 rounded-md transition-colors"
            >
              Create New Wallet
            </button>
          )}

          <div className="mt-5 bg-blue-900/20 border border-blue-700/30 text-sm text-blue-300 p-3 rounded-md flex items-start gap-2">
            <Shield className="w-4 h-4 mt-0.5 shrink-0 text-blue-400" />
            <span>
              Your wallet data is encrypted and stored locally. We never have
              access to your private keys.
            </span>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Need help?{" "}
          <button className="text-blue-400 hover:underline">
            Contact Support
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
