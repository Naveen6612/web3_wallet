import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers"; // ✅ for wallet & mnemonic generation
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const CreateWalletPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const handleCreateWallet = async () => {
    if (password.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!agree) {
      alert("You must agree to proceed.");
      return;
    }

    // ✅ Generate mnemonic
    const wallet = ethers.Wallet.createRandom();
    const mnemonic = wallet.mnemonic?.phrase;

    if (!mnemonic) {
      alert("Failed to generate mnemonic.");
      return;
    }

    // ✅ Generate a UUID
    const uuid = uuidv4();

    console.log("Sending to backend:", { uuid, mnemonic });
    try {
      // ✅ Send to backend: encryptedMnemonic + uuid
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        {
          uuid,
          mnemonic,
        }
      );
      console.log("Successfully sent");

      // ✅ Store password, uuid, and mnemonic locally
      localStorage.setItem("wallet_password", password);
      localStorage.setItem("wallet_uuid", uuid);
      localStorage.setItem("wallet_accounts", JSON.stringify([]));
      localStorage.setItem("wallet_mnemonic", mnemonic); // ✅ This is the missing line

      // ✅ Navigate to next page
      navigate("/generate-mnemonic");
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Something went wrong while creating your wallet.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d] px-4">
      <div className="w-full max-w-md bg-[#141414] p-6 rounded-xl border border-[#2c2c2c] shadow-md text-white">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-gray-400 hover:text-white flex items-center gap-2 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <h3 className="text-sm text-gray-400 mb-1">Step 1 of 3</h3>
        <h1 className="text-2xl font-bold mb-2">Create Wallet Password</h1>
        <p className="text-gray-500 text-sm mb-6">
          This password will unlock your wallet on this device only.
        </p>

        {/* Password */}
        <label className="block text-sm text-gray-300 mb-1">
          Create new password
        </label>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full px-4 py-2 rounded-md bg-[#1f1f1f] border border-[#333] text-white pr-10"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Confirm Password */}
        <label className="block text-sm text-gray-300 mb-1">
          Confirm password
        </label>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full px-4 py-2 rounded-md bg-[#1f1f1f] border border-[#333] text-white pr-10"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Checkbox */}
        <div className="flex items-start gap-2 text-sm mb-6">
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
            className="mt-1 accent-blue-600"
          />
          <p className="text-gray-400 leading-tight">
            I understand that if I lose this password, I won’t be able to
            recover my wallet.
          </p>
        </div>

        {/* Button */}
        <button
          onClick={handleCreateWallet}
          disabled={!password || !confirmPassword || !agree}
          className={`w-full py-2.5 rounded-md text-white font-semibold transition-all
            ${
              !password || !confirmPassword || !agree
                ? "bg-blue-800 opacity-50 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          Create Password
        </button>
      </div>
    </div>
  );
};

export default CreateWalletPage;
