import { useState, useEffect, useRef } from "react";
import { Bell, Search, Wallet } from "lucide-react";
import { Select, type SelectProps } from "antd";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import AddAccountButton from "./Button";
import type { WalletAccount } from "@/types/wallet";
import { deriveAccount } from "@/utils/hdWallets";
import { getBalance } from "@/utils/utilsWallet";
import LogoutButton from "./LogoutButton";

const chainOptions: SelectProps["options"] = [
  { label: "Ethereum", value: "0x1" },
  { label: "Polygon", value: "0x89" },
  { label: "BSC", value: "0x38" },
  { label: "Arbitrum", value: "0xa4b1" },
];

const Navbar = () => {
  const [selectedChain, setSelectedChain] = useState("0x1");
  const [accounts, setAccounts] = useState<WalletAccount[]>([]);
  const [showAccounts, setShowAccounts] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowAccounts(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCreateAccount = async () => {
    const mnemonic = localStorage.getItem("wallet_mnemonic");
    if (!mnemonic) {
      alert("Mnemonic not found.");
      return;
    }

    try {
      const index = accounts.length;
      const newAcc = await deriveAccount(mnemonic, index);
      const balance = await getBalance(newAcc.address);
      const account: WalletAccount = {
        ...newAcc,
        id: `account-${index}`,
        name: `Account ${index + 1}`,
        balance,
        publicKey: "",
      };

      const updatedAccounts = [...accounts, account];
      setAccounts(updatedAccounts);
      localStorage.setItem("wallet_accounts", JSON.stringify(updatedAccounts));
      setShowAccounts(true);
    } catch (err) {
      console.error("Account creation failed:", err);
    }
  };

  const handleAccountClick = (id: string) => {
    navigate(`/account/${id}`);
  };

  // Optional: Load accounts from localStorage on first mount
  useEffect(() => {
    const stored = localStorage.getItem("wallet_accounts");
    if (stored) {
      setAccounts(JSON.parse(stored));
    }
  }, []);

  return (
    <nav className="bg-black text-white shadow-md px-4 md:px-6 py-4 relative">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
        {/* Left Section */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6 w-full md:w-auto">
          <div className="flex-shrink-0">
            <h1 className="text-2xl md:text-3xl font-extrabold leading-none">
              WALL
              <br />
              ETH
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Select
              className="custom-dark-select min-w-[150px] h-10"
              popupClassName="custom-dark-dropdown"
              value={selectedChain}
              onChange={(val) => setSelectedChain(val)}
              options={chainOptions}
            />
            {["Swap", "Send"].map((label) => (
              <button
                key={label}
                className="min-w-[90px] text-center bg-red text-red-950 border border-white px-4 py-2 rounded-md text-sm md:text-base"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-wrap items-center gap-3 justify-end w-full md:w-auto relative">
          {/* Add Account Button */}
          <div className="relative" ref={dropdownRef}>
            <AddAccountButton
              onCreate={handleCreateAccount}
              onDropdownToggle={() => setShowAccounts(!showAccounts)}
              accountCount={accounts.length}
            />
            {showAccounts && accounts.length > 0 && (
              <div className="absolute top-14 left-0 z-50 w-72 bg-[#0b1f3a] text-white border border-blue-700 rounded-md shadow-lg overflow-hidden">
                {accounts.map((account, index) => (
                  <div
                    key={account.id}
                    className="group px-4 py-3 flex justify-between items-start hover:bg-blue-900 transition-colors cursor-pointer"
                    onClick={() => handleAccountClick(account.id)}
                  >
                    <div className="flex flex-col max-w-[85%]">
                      <div className="font-semibold text-sm">
                        {account.name}
                      </div>
                      <div className="text-xs text-gray-300 truncate">
                        {account.address}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const updated = accounts.filter((_, i) => i !== index);
                        setAccounts(updated);
                        localStorage.setItem(
                          "wallet_accounts",
                          JSON.stringify(updated)
                        );
                      }}
                      className="text-red-400 hover:text-red-600 transition-colors"
                      title="Delete account"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search
              className="absolute left-2 top-2.5 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search for a token..."
              className="pl-8 pr-3 py-2 rounded-md bg-[#111] border border-white text-white placeholder-gray-400 w-full"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Wallet size={20} />
              <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full px-1">
                {accounts.length}
              </span>
            </div>
            <Bell size={20} />
          </div>

          {/* Connect Wallet */}
          <button className="bg-black text-white px-4 py-2 rounded-md text-sm md:text-base hover:bg-blue-900">
            Connect wallet
          </button>
          {/* logout button */}
          <LogoutButton/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
